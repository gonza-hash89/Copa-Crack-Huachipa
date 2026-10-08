import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { validateOpinion } from "@/lib/sanitize";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const DATA_FILE = path.join(process.cwd(), "data", "opiniones.json");

/* ---------- Respaldo JSON (modo local / sin credenciales) ---------- */
async function readJson() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

async function writeJson(list) {
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2) + "\n", "utf-8");
}

function toPublic(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    parentesco: row.parentesco,
    puntuacion: row.puntuacion,
    opinion: row.opinion,
    creadoEn: row.created_at || row.creadoEn || null,
  };
}

/** GET: solo opiniones aprobadas (las pendientes quedan ocultas). */
export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("opiniones")
        .select("*")
        .eq("aprobado", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json({ opiniones: (data || []).map(toPublic), fuente: "supabase" });
    } catch (e) {
      console.error("Supabase GET opiniones falló, usando respaldo JSON:", e?.message);
    }
  }
  const all = await readJson();
  const aprobadas = all
    .filter((o) => o && o.aprobado === true)
    .sort((a, b) => new Date(b.creadoEn || b.created_at) - new Date(a.creadoEn || a.created_at));
  return NextResponse.json({ opiniones: aprobadas.map(toPublic), fuente: "json" });
}

/** POST: recibe una opinión y la guarda como pendiente (aprobado:false). */
export async function POST(req) {
  // 1. Rate limiting: 3 envíos / 10 min por IP
  const ip = getClientIp(req);
  const rl = checkRateLimit(`opiniones:${ip}`, 3, 10 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Inténtalo de nuevo en unos minutos." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // 2. Honeypot anti-bots: campo invisible "website" que solo los bots llenan.
  if (body && typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, moderacion: true });
  }

  // 3. Validación + sanitización autoritativa
  const { clean, errors, ok } = validateOpinion(body || {});
  if (!ok) {
    return NextResponse.json({ error: "Revisa los campos del formulario.", detalles: errors }, { status: 400 });
  }

  // 4a. Ruta principal: Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("opiniones").insert({
        nombre: clean.nombre,
        parentesco: clean.parentesco,
        puntuacion: clean.puntuacion,
        opinion: clean.opinion,
        aprobado: false, // moderación: visible solo tras aprobación
      });
      if (error) throw error;
      return NextResponse.json(
        {
          ok: true,
          moderacion: true,
          mensaje: "¡Gracias por tu opinión! Tu comentario se publicará en la web una vez verificado por la administración.",
        },
        { status: 201 }
      );
    } catch (e) {
      console.error("Supabase POST opiniones falló, usando respaldo JSON:", e?.message);
    }
  }

  // 4b. Respaldo JSON (local / sin credenciales). En Vercel es efímero.
  const nueva = {
    id: `op-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nombre: clean.nombre,
    parentesco: clean.parentesco,
    puntuacion: clean.puntuacion,
    opinion: clean.opinion,
    aprobado: false,
    creadoEn: new Date().toISOString(),
  };
  const all = await readJson();
  all.push(nueva);
  try {
    await writeJson(all);
  } catch {
    return NextResponse.json({ error: "No se pudo guardar tu opinión. Inténtalo más tarde." }, { status: 500 });
  }

  return NextResponse.json(
    {
      ok: true,
      moderacion: true,
      mensaje: "¡Gracias por tu opinión! Tu comentario se publicará en la web una vez verificado por la administración.",
    },
    { status: 201 }
  );
}

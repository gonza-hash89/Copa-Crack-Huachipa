import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { validateOpinion } from "@/lib/sanitize";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const DATA_FILE = path.join(process.cwd(), "data", "opiniones.json");

/**
 * NOTA DE PERSISTENCIA: en Vercel (serverless) el sistema de archivos es
 * efímero: las opiniones guardadas con aprobado:false se conservan en local
 * y se pierden entre despliegues/instancias. Para producción definitiva se
 * recomienda migrar este route a Supabase/Neon (tabla `opiniones`).
 */
async function readAll() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

async function writeAll(list) {
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2) + "\n", "utf-8");
}

/** GET: solo opiniones aprobadas (las pendientes quedan ocultas). */
export async function GET() {
  const all = await readAll();
  const aprobadas = all
    .filter((o) => o && o.aprobado === true)
    .sort((a, b) => new Date(b.creadoEn) - new Date(a.creadoEn));
  return NextResponse.json({ opiniones: aprobadas });
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
  //    Si viene con contenido, fingimos éxito sin guardar nada.
  if (body && typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, moderacion: true });
  }

  // 3. Validación + sanitización autoritativa
  const { clean, errors, ok } = validateOpinion(body || {});
  if (!ok) {
    return NextResponse.json({ error: "Revisa los campos del formulario.", detalles: errors }, { status: 400 });
  }

  const nueva = {
    id: `op-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nombre: clean.nombre,
    parentesco: clean.parentesco,
    puntuacion: clean.puntuacion,
    opinion: clean.opinion,
    aprobado: false, // moderación: visible solo tras aprobación de administración
    creadoEn: new Date().toISOString(),
  };

  const all = await readAll();
  all.push(nueva);
  try {
    await writeAll(all);
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

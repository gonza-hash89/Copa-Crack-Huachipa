import { NextResponse } from "next/server";

/**
 * Middleware global: auditoría + blindaje de rutas sensibles.
 * - Registra método + ruta + IP (sin datos personales) para auditar
 *   peticiones sospechosas (rastreo de bots, fuzzing de endpoints).
 * - Bloquea endpoints de debug/administración que no deben existir
 *   en producción (/api/debug*, /admin*): responde 404 genérico.
 */
export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Rutas sensibles: no existen en la app; se bloquean de forma explícita
  // para que un despliegue futuro no las exponga por accidente.
  if (pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/debug")) {
    log(req, 404, "blocked-sensitive-route");
    return new NextResponse(JSON.stringify({ error: "No encontrado." }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Auditoría ligera de API: detectar patrones de abuso (se amplía en el
  // servidor con el rate limiting de cada route).
  if (pathname.startsWith("/api/")) {
    const ua = (req.headers.get("user-agent") || "").slice(0, 120);
    log(req, null, `api-hit ua="${ua}"`);
  }

  return NextResponse.next();
}

function log(req, status, extra) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "-";
  const stamp = new Date().toISOString();
  // Solo metadatos de la petición; nunca cuerpos ni PII.
  console.log(`[audit] ${stamp} ${req.method} ${req.nextUrl.pathname} ip=${ip}${status ? ` status=${status}` : ""} ${extra || ""}`);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/).*)"],
};

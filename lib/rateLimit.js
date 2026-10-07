/**
 * Rate limiting en memoria por IP para API routes.
 * NOTA: en serverless (Vercel) cada instancia tiene su propio
 * conteo; mitiga abuso casual y bots simples, no ataques distribuidos.
 */

const buckets = new Map(); // key -> number[] (timestamps ms)

function prune(list, windowMs, now) {
  return list.filter((t) => now - t < windowMs);
}

/**
 * @param {string} key  identificador (ej. `opiniones:<ip>`)
 * @param {number} limit  máximo de intentos por ventana
 * @param {number} windowMs  ventana en milisegundos
 * @returns {{ allowed: boolean, retryAfterSec: number }}
 */
export function checkRateLimit(key, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const prev = prune(buckets.get(key) || [], windowMs, now);
  if (prev.length >= limit) {
    const oldest = prev[0];
    const retryAfterSec = Math.ceil((oldest + windowMs - now) / 1000);
    return { allowed: false, retryAfterSec: Math.max(retryAfterSec, 1) };
  }
  prev.push(now);
  buckets.set(key, prev);
  // Limpieza oportunista para no crecer sin límite
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      const kept = prune(v, windowMs, now);
      if (!kept.length) buckets.delete(k);
      else buckets.set(k, kept);
    }
  }
  return { allowed: true, retryAfterSec: 0 };
}

export function getClientIp(req) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

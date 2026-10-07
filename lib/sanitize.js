/**
 * Sanitización y validación de entradas de texto (anti-XSS).
 * La sanitización autoritativa ocurre en el servidor; el cliente
 * hace una pasada previa para dar feedback inmediato.
 */

const MAX_LENGTHS = {
  nombre: 60,
  parentesco: 80,
  opinion: 600,
  padreNombre: 60,
  alumnoNombre: 80,
  telefono: 20,
};

/** Elimina etiquetas HTML, atributos de eventos y protocolos peligrosos. */
export function sanitizeText(value, max = 200) {
  if (typeof value !== "string") return "";
  let out = value
    .replace(/<[^>]*>/g, "") // sin tags HTML
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "")
    .replace(/on\w+\s*=/gi, "") // sin handlers tipo onclick=
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "") // sin controles
    .replace(/\s+/g, " ")
    .trim();
  if (out.length > max) out = out.slice(0, max).trim();
  return out;
}

/** Teléfono: solo dígitos, espacios, +, -, (). */
export function sanitizePhone(value) {
  if (typeof value !== "string") return "";
  const out = value.replace(/[^0-9+\-() ]/g, "").replace(/\s+/g, " ").trim();
  return out.slice(0, MAX_LENGTHS.telefono);
}

export function isValidRating(v) {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 5;
}

export function validateOpinion({ nombre, parentesco, puntuacion, opinion }) {
  const errors = {};
  const clean = {
    nombre: sanitizeText(nombre, MAX_LENGTHS.nombre),
    parentesco: sanitizeText(parentesco, MAX_LENGTHS.parentesco),
    opinion: sanitizeText(opinion, MAX_LENGTHS.opinion),
    puntuacion: Number(puntuacion),
  };
  if (clean.nombre.length < 2) errors.nombre = "Ingresa tu nombre (mínimo 2 caracteres).";
  if (clean.parentesco.length < 2) errors.parentesco = "Indica tu parentesco o la categoría del alumno.";
  if (!isValidRating(clean.puntuacion)) errors.puntuacion = "Selecciona una puntuación de 1 a 5 estrellas.";
  if (clean.opinion.length < 10) errors.opinion = "Cuéntanos tu experiencia con al menos 10 caracteres.";
  return { clean, errors, ok: Object.keys(errors).length === 0 };
}

export { MAX_LENGTHS };

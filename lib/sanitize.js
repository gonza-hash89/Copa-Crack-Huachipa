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
  nombre_apoderado: 60,
  nombre_alumno: 80,
  comentario: 600,
};

const CATEGORIAS_VALIDAS = ["4 - 6 años", "7 - 10 años", "11 - 13 años"];

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

export function validateOpinion({ nombre_apoderado, nombre_alumno, categoria, estrellas, comentario }) {
  const errors = {};
  const clean = {
    nombre_apoderado: sanitizeText(nombre_apoderado, MAX_LENGTHS.nombre_apoderado),
    nombre_alumno: sanitizeText(nombre_alumno || "", MAX_LENGTHS.nombre_alumno),
    categoria: sanitizeText(categoria || "", 20),
    estrellas: Number(estrellas),
    comentario: sanitizeText(comentario, MAX_LENGTHS.comentario),
  };
  if (clean.nombre_apoderado.length < 2)
    errors.nombre_apoderado = "Ingresa tu nombre (mínimo 2 caracteres).";
  if (clean.nombre_alumno && clean.nombre_alumno.length < 2)
    errors.nombre_alumno = "El nombre del alumno debe tener al menos 2 caracteres.";
  if (clean.categoria && !CATEGORIAS_VALIDAS.includes(clean.categoria))
    errors.categoria = "Selecciona una categoría válida.";
  if (!isValidRating(clean.estrellas)) errors.estrellas = "Selecciona de 1 a 5 estrellas.";
  if (clean.comentario.length < 10)
    errors.comentario = "Cuéntanos tu experiencia con al menos 10 caracteres.";
  return { clean, errors, ok: Object.keys(errors).length === 0 };
}

export { MAX_LENGTHS };

"use client";
import { useState } from "react";
import { wa } from "./Hero";
import { sanitizeText, sanitizePhone } from "@/lib/sanitize";

export default function Contacto() {
  const [formData, setFormData] = useState({
    padreNombre: "",
    alumnoNombre: "",
    categoria: "",
    telefono: "",
    website: "" // honeypot anti-bots (debe ir vacío)
  });
  const [submitted, setSubmitted] = useState(false);
  const [lastSentAt, setLastSentAt] = useState(0);
  const [acepto, setAcepto] = useState(false);

  const categorias = [
    { value: "4 - 6 años", label: "Iniciación — 4 a 6 años" },
    { value: "7 - 10 años", label: "Formación — 7 a 10 años" },
    { value: "11 - 13 años", label: "Competencia Infantil — 11 a 13 años" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Honeypot: si un bot llenó el campo invisible, fingimos éxito sin hacer nada
    if (formData.website && formData.website.trim() !== "") {
      setSubmitted(true);
      return;
    }
    // Consentimiento Ley N° 29733: obligatorio para enviar
    if (!acepto) return;
    // Rate limiting en cliente: 1 envío cada 30 segundos
    if (Date.now() - lastSentAt < 30 * 1000) return;

    // Sanitización anti-XSS antes de armar el mensaje de WhatsApp
    const padreNombre = sanitizeText(formData.padreNombre, 60);
    const alumnoNombre = sanitizeText(formData.alumnoNombre, 80);
    const categoria = sanitizeText(formData.categoria, 20);
    const telefono = sanitizePhone(formData.telefono);
    if (padreNombre.length < 2 || alumnoNombre.length < 2 || !categoria || telefono.length < 6) return;

    const message = `Hola, soy ${padreNombre}, deseo una clase de prueba gratis para mi hijo ${alumnoNombre} en la categoría ${categoria}. Mi celular es ${telefono}`;
    window.open(wa(message), "_blank", "noopener,noreferrer");
    setLastSentAt(Date.now());
    setSubmitted(true);
    setFormData({ padreNombre: "", alumnoNombre: "", categoria: "", telefono: "", website: "" });
  };

  return (
    <section id="contacto" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="text-center mb-12">
          <span className="inline-block rounded-full bg-neon/10 border border-neon/30 px-4 py-1 text-sm font-semibold text-neon mb-4">
            📍 Nuestra Sede
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-center">Sede y Horarios de Entrenamiento</h2>
          <p className="mt-4 max-w-2xl mx-auto text-emerald-50/70">
            Entrenamientos personalizados por categorías en simultáneo. ¡Ven a conocer nuestra cancha y solicita tu clase de prueba gratis!
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Columna 1: Información de Sede y Mapa */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl text-center mb-4">Complejo Deportivo "Parque Industrial"</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl" aria-hidden="true">📍</span>
                  <div>
                    <p className="font-semibold">Huachipa / Lurigancho-Chosica</p>
                    <p className="text-emerald-50/70 text-sm">2372+44Q, Lurigancho-Chosica 15461</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl" aria-hidden="true">🕐</span>
                  <div>
                    <p className="font-semibold">Martes y Jueves</p>
                    <p className="text-emerald-50/70 text-sm">5:30 PM a 7:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl" aria-hidden="true">⚽</span>
                  <div>
                    <p className="font-semibold">Metodología</p>
                    <p className="text-emerald-50/70 text-sm">
                      Trabajo en paralelo en cancha por grupos de edad (Iniciación y Competencia con comando técnico dedicado)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl" aria-hidden="true">📞</span>
                  <div>
                    <p className="font-semibold">WhatsApp Directo</p>
                    <a href="https://wa.me/51944897167" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-neon">
                      +51 944 897 167
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Maps Iframe */}
              <div className="glass rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.9738312345678!2d-76.8068123!3d-11.9567891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8e7f8e7f8e7%3A0x123456789abcdef!2sComplejo%20Deportivo%20Parque%20Industrial!5e0!3m2!1ses!2spe!4v1699999999999!5m2!1ses!2spe"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Complejo Deportivo Parque Industrial - Huachipa"
                />
              </div>
            </div>

            {/* Columna 2: Formulario de Pre-Inscripción */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl text-center mb-2">Solicita tu Clase de Prueba Gratis</h3>
              <p className="text-emerald-50/70 text-center mb-6">
                Completa el formulario y te contactaremos por WhatsApp para coordinar tu visita.
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4" aria-hidden="true">✅</div>
                  <h3 className="font-display text-2xl text-neon mb-2">¡Solicitud enviada!</h3>
                  <p className="text-emerald-50/70 mb-4">
                    Se ha abierto WhatsApp con tu mensaje prellenado. Te contactaremos pronto.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="rounded-full bg-neon px-6 py-2 font-semibold text-night hover:bg-gold transition-colors"
                  >
                    Nueva solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Honeypot anti-bots: invisible para humanos */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="absolute h-0 w-0 opacity-0 pointer-events-none"
                  />
                  <div>
                    <label htmlFor="padre-nombre" className="block text-sm font-medium text-emerald-50/80 mb-1">
                      Nombre del Padre / Apoderado <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      id="padre-nombre"
                      name="padreNombre"
                      value={formData.padreNombre}
                      onChange={handleChange}
                      required
                      placeholder="Ej. Juan Pérez"
                      className="w-full rounded-lg bg-black/30 border border-emerald-500/30 focus:border-neon focus:ring-2 focus:ring-neon/30 px-4 py-3 text-emerald-50 placeholder-emerald-50/40 transition-colors"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label htmlFor="alumno-nombre" className="block text-sm font-medium text-emerald-50/80 mb-1">
                      Nombre y edad del alumno <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      id="alumno-nombre"
                      name="alumnoNombre"
                      value={formData.alumnoNombre}
                      onChange={handleChange}
                      required
                      placeholder="Ej. Carlos Pérez, 8 años"
                      className="w-full rounded-lg bg-black/30 border border-emerald-500/30 focus:border-neon focus:ring-2 focus:ring-neon/30 px-4 py-3 text-emerald-50 placeholder-emerald-50/40 transition-colors"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label htmlFor="categoria" className="block text-sm font-medium text-emerald-50/80 mb-1">
                      Categoría de interés <span className="text-gold">*</span>
                    </label>
                    <select
                      id="categoria"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg bg-black/30 border border-emerald-500/30 focus:border-neon focus:ring-2 focus:ring-neon/30 px-4 py-3 text-emerald-50 appearance-none bg-no-repeat bg-right pr-10 transition-colors"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1rem"
                      }}
                    >
                      <option value="">Selecciona una categoría</option>
                      {categorias.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-emerald-50/80 mb-1">
                      Teléfono de contacto <span className="text-gold">*</span>
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="Ej. 944 897 167"
                      className="w-full rounded-lg bg-black/30 border border-emerald-500/30 focus:border-neon focus:ring-2 focus:ring-neon/30 px-4 py-3 text-emerald-50 placeholder-emerald-50/40 transition-colors"
                      autoComplete="tel"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-emerald-50/75">
                    <input
                      type="checkbox"
                      checked={acepto}
                      onChange={(e) => setAcepto(e.target.checked)}
                      required
                      className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#00FF00]"
                    />
                    <span>
                      He leído y acepto la{" "}
                      <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-neon underline">
                        Política de Privacidad
                      </a>{" "}
                      para el tratamiento de mis datos personales.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!acepto}
                    className="w-full rounded-full bg-neon px-6 py-3 font-semibold text-night hover:bg-gold hover:shadow-[0_0_30px_rgba(16,185,129,.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neon disabled:hover:shadow-none"
                  >
                    Matricularme ya
                  </button>

                  <p className="text-center text-xs text-emerald-50/50 mt-4">
                    Al enviar, se abrirá WhatsApp con tu mensaje prellenado. No se guardan datos en este sitio.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";
import { useEffect, useState } from "react";
import Tilt from "./Tilt";

function Stars({ value = 5, interactive = false, onPick = null }) {
  return (
    <div className="flex gap-1 text-[#FFF200]" role={interactive ? "radiogroup" : undefined} aria-label={`${value} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        const filled = n <= value;
        return interactive ? (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} estrella${n > 1 ? "s" : ""}`}
            onClick={() => onPick && onPick(n)}
            className={`text-2xl transition-transform hover:scale-125 ${filled ? "" : "opacity-30"}`}
          >
            <span aria-hidden="true">★</span>
          </button>
        ) : (
          <span key={n} aria-hidden="true" className={filled ? "" : "opacity-30"}>★</span>
        );
      })}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg bg-black/30 border border-emerald-500/30 focus:border-[#00FF00] focus:ring-2 focus:ring-[#00FF00]/30 px-4 py-2.5 text-sm text-emerald-50 placeholder-emerald-50/40 transition-colors";

export default function Testimonios() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nombre: "", parentesco: "", puntuacion: 5, opinion: "", website: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    let alive = true;
    fetch("/api/opiniones", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { opiniones: [] }))
      .then((d) => {
        if (alive) setReviews(Array.isArray(d.opiniones) ? d.opiniones : []);
      })
      .catch(() => {
        if (alive) setReviews([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        setSent(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSendError("");
    // Sanitización previa en cliente (la autoritativa está en el servidor)
    const clean = {
      nombre: form.nombre.replace(/<[^>]*>/g, "").trim().slice(0, 60),
      parentesco: form.parentesco.replace(/<[^>]*>/g, "").trim().slice(0, 80),
      puntuacion: Number(form.puntuacion),
      opinion: form.opinion.replace(/<[^>]*>/g, "").trim().slice(0, 600),
      website: form.website, // honeypot: debe ir vacío
    };
    const errs = {};
    if (clean.nombre.length < 2) errs.nombre = "Ingresa tu nombre.";
    if (clean.parentesco.length < 2) errs.parentesco = "Indica tu parentesco o la categoría del alumno.";
    if (!(clean.puntuacion >= 1 && clean.puntuacion <= 5)) errs.puntuacion = "Elige de 1 a 5 estrellas.";
    if (clean.opinion.length < 10) errs.opinion = "Cuéntanos un poco más (mínimo 10 caracteres).";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/opiniones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clean),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSendError(data.error || "No se pudo enviar tu opinión. Inténtalo más tarde.");
        return;
      }
      setSent(true);
      setForm({ nombre: "", parentesco: "", puntuacion: 5, opinion: "", website: "" });
    } catch {
      setSendError("Error de conexión. Inténtalo más tarde.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="testimonios" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="text-center mb-10">
          <span className="inline-block rounded-full bg-neon/10 border border-neon/30 px-4 py-1 text-sm font-semibold text-neon mb-4">
            💬 Testimonios
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-center">Lo que dicen los padres</h2>
          <p className="mt-4 max-w-2xl mx-auto text-emerald-50/70">
            La confianza se gana en la cancha: formación integral dentro y fuera del campo.
          </p>
        </header>

        {loading ? (
          <p className="text-center text-emerald-50/60">Cargando opiniones…</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-emerald-50/60">
            Aún no hay opiniones publicadas. ¡Sé la primera persona en dejar la tuya!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <Tilt key={r.id || r.nombre} className="glass rounded-2xl p-6 flex flex-col">
                <span className="font-display text-5xl text-[#00FF00]/40 leading-none" aria-hidden="true">“</span>
                <Stars value={r.puntuacion || 5} />
                <p className="mt-3 text-sm leading-relaxed text-emerald-50/85 flex-1">{r.opinion}</p>
                <div className="mt-5 pt-4 border-t border-white/10">
                  <p className="font-semibold">{r.nombre}</p>
                  <p className="text-xs text-emerald-50/60">{r.parentesco}</p>
                </div>
              </Tilt>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <button
            onClick={() => {
              setModalOpen(true);
              setSent(false);
              setSendError("");
            }}
            className="rounded-full bg-[#FFF200] px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-[#070D1E] shadow-[0_0_24px_rgba(255,242,0,0.45)] hover:shadow-[0_0_36px_rgba(255,242,0,0.7)] hover:-translate-y-0.5 transition-all"
          >
            Dejar una opinión sobre la escuela
          </button>
        </div>
      </div>

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Dejar una opinión"
          onClick={() => {
            setModalOpen(false);
            setSent(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl w-full max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="font-display text-2xl">Tu opinión nos importa</h3>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSent(false);
                }}
                aria-label="Cerrar"
                className="text-2xl text-white/70 hover:text-gold leading-none"
              >
                ×
              </button>
            </div>

            {sent ? (
              <div className="text-center py-6">
                <div className="text-6xl mb-4" aria-hidden="true">✅</div>
                <p className="font-semibold text-lg text-[#00FF00]">
                  ¡Gracias por tu opinión!
                </p>
                <p className="mt-2 text-sm text-emerald-50/75">
                  Tu comentario se publicará en la web una vez verificado por la administración.
                </p>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setSent(false);
                  }}
                  className="mt-6 rounded-full bg-neon px-6 py-2 text-sm font-semibold text-night hover:bg-gold transition-colors"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4" noValidate>
                {/* Honeypot anti-bots: invisible para humanos */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute h-0 w-0 opacity-0 pointer-events-none"
                />

                <div>
                  <label htmlFor="op-nombre" className="block text-sm font-medium text-emerald-50/80 mb-1">
                    Nombre <span className="text-gold">*</span>
                  </label>
                  <input
                    id="op-nombre"
                    type="text"
                    value={form.nombre}
                    onChange={(e) => set("nombre", e.target.value)}
                    placeholder="Ej. María Torres"
                    maxLength={60}
                    required
                    autoComplete="name"
                    className={inputCls}
                  />
                  {errors.nombre && <p className="mt-1 text-xs text-red-400">{errors.nombre}</p>}
                </div>

                <div>
                  <label htmlFor="op-parentesco" className="block text-sm font-medium text-emerald-50/80 mb-1">
                    Parentesco / Categoría del alumno <span className="text-gold">*</span>
                  </label>
                  <input
                    id="op-parentesco"
                    type="text"
                    value={form.parentesco}
                    onChange={(e) => set("parentesco", e.target.value)}
                    placeholder="Ej. Mamá de Thiago · 7 años (Formación)"
                    maxLength={80}
                    required
                    className={inputCls}
                  />
                  {errors.parentesco && <p className="mt-1 text-xs text-red-400">{errors.parentesco}</p>}
                </div>

                <div>
                  <span className="block text-sm font-medium text-emerald-50/80 mb-1">
                    Puntuación <span className="text-gold">*</span>
                  </span>
                  <Stars value={form.puntuacion} interactive onPick={(n) => set("puntuacion", n)} />
                  {errors.puntuacion && <p className="mt-1 text-xs text-red-400">{errors.puntuacion}</p>}
                </div>

                <div>
                  <label htmlFor="op-texto" className="block text-sm font-medium text-emerald-50/80 mb-1">
                    Opinión <span className="text-gold">*</span>
                  </label>
                  <textarea
                    id="op-texto"
                    value={form.opinion}
                    onChange={(e) => set("opinion", e.target.value)}
                    placeholder="Cuéntanos tu experiencia en la escuela…"
                    maxLength={600}
                    rows={4}
                    required
                    className={`${inputCls} resize-y`}
                  />
                  <div className="mt-1 flex items-center justify-between">
                    {errors.opinion ? (
                      <p className="text-xs text-red-400">{errors.opinion}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-emerald-50/40">{form.opinion.length}/600</span>
                  </div>
                </div>

                {sendError && <p className="text-sm text-red-400">{sendError}</p>}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-full bg-[#FFF200] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-[#070D1E] shadow-[0_0_24px_rgba(255,242,0,0.45)] hover:shadow-[0_0_36px_rgba(255,242,0,0.7)] transition-all disabled:opacity-60"
                >
                  {sending ? "Enviando…" : "Enviar opinión"}
                </button>
                <p className="text-center text-xs text-emerald-50/50">
                  Tu comentario quedará pendiente de verificación por la administración.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

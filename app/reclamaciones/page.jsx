"use client";
import { useState } from "react";

export const dynamic = "force-static";

const inputCls =
  "w-full rounded-lg bg-black/30 border border-emerald-500/30 focus:border-[#00FF00] focus:ring-2 focus:ring-[#00FF00]/30 px-4 py-2.5 text-sm text-emerald-50 placeholder-emerald-50/40 transition-colors";
const labelCls = "block text-sm font-medium text-emerald-50/80 mb-1";

const clean = (v, max) =>
  String(v || "")
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

export default function Reclamaciones() {
  const [form, setForm] = useState({
    nombres: "",
    dni: "",
    domicilio: "",
    telefono: "",
    email: "",
    fechaServicio: "",
    categoria: "",
    tipo: "reclamo",
    detalle: "",
    pedido: "",
    website: "",
    acepto: false,
  });
  const [errors, setErrors] = useState({});
  const [codigo, setCodigo] = useState("");
  const [lastSentAt, setLastSentAt] = useState(0);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (form.website.trim() !== "") {
      setCodigo(`LR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      return;
    }
    if (Date.now() - lastSentAt < 30 * 1000) return;

    const c = {
      nombres: clean(form.nombres, 80),
      dni: clean(form.dni, 12).replace(/[^0-9]/g, ""),
      domicilio: clean(form.domicilio, 120),
      telefono: clean(form.telefono, 20).replace(/[^0-9+\-() ]/g, ""),
      email: clean(form.email, 80),
      fechaServicio: form.fechaServicio,
      categoria: clean(form.categoria, 30),
      tipo: form.tipo === "queja" ? "queja" : "reclamo",
      detalle: clean(form.detalle, 1000),
      pedido: clean(form.pedido, 500),
    };
    const errs = {};
    if (c.nombres.length < 3) errs.nombres = "Ingresa tus nombres completos.";
    if (!/^\d{8}$/.test(c.dni)) errs.dni = "El DNI debe tener 8 dígitos.";
    if (c.domicilio.length < 5) errs.domicilio = "Ingresa tu domicilio.";
    if (c.telefono.replace(/\D/g, "").length < 6) errs.telefono = "Ingresa un teléfono válido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) errs.email = "Ingresa un correo válido.";
    if (!c.fechaServicio) errs.fechaServicio = "Indica la fecha del servicio.";
    if (c.detalle.length < 20) errs.detalle = "Describe lo ocurrido con al menos 20 caracteres.";
    if (c.pedido.length < 10) errs.pedido = "Indica tu pedido con al menos 10 caracteres.";
    if (!form.acepto) errs.acepto = "Debes aceptar la Política de Privacidad.";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLastSentAt(Date.now());
    setCodigo(`LR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
    setForm((f) => ({ ...f, detalle: f.detalle, pedido: f.pedido }));
    window.__reclamo = c;
  };

  const enviarWhatsApp = () => {
    const c = window.__reclamo;
    if (!c) return;
    const msg =
      `LIBRO DE RECLAMACIONES - Escuela Lucmar Huachipa\n` +
      `Código: ${codigo}\n` +
      `Consumidor: ${c.nombres} (DNI ${c.dni})\n` +
      `Contacto: ${c.telefono} / ${c.email}\n` +
      `Servicio: ${c.fechaServicio} · ${c.categoria}\n` +
      `Tipo: ${c.tipo === "queja" ? "Queja" : "Reclamo"}\n` +
      `Detalle: ${c.detalle}\n` +
      `Pedido: ${c.pedido}`;
    window.open(`https://wa.me/51944897167?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const err = (k) => errors[k] && <p className="mt-1 text-xs text-red-400">{errors[k]}</p>;

  return (
    <section className="px-4 pt-32 pb-20">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-neon/10 border border-neon/30 px-4 py-1 text-sm font-semibold text-neon mb-4">
            <span aria-hidden="true">📕</span> Libro de Reclamaciones Virtual
          </span>
          <h1 className="font-display text-4xl sm:text-5xl">Hoja de Reclamación</h1>
          <p className="mt-4 text-emerald-50/70">
            Conforme a la normativa de INDECOPI. Tu reclamo será atendido en un plazo máximo
            de 15 días hábiles.
          </p>
        </header>

        {codigo ? (
          <div className="glass rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4" aria-hidden="true">✅</div>
            <h2 className="font-display text-2xl text-[#00FF00]">Reclamo registrado</h2>
            <p className="mt-2 text-emerald-50/80">
              Tu código de seguimiento es: <strong className="text-gold">{codigo}</strong>
            </p>
            <p className="mt-2 text-sm text-emerald-50/70">
              Guárdalo para cualquier consulta. Ahora envíanos la hoja por WhatsApp para
              darle trámite inmediato, o imprímela para tu archivo.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={enviarWhatsApp}
                className="rounded-full bg-[#00FF00] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-[#070D1E] hover:-translate-y-0.5 transition-transform"
              >
                Enviar por WhatsApp
              </button>
              <button
                onClick={() => window.print()}
                className="rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold hover:bg-gold hover:text-night transition-colors"
              >
                Imprimir hoja
              </button>
              <button
                onClick={() => {
                  setCodigo("");
                  setForm({
                    nombres: "", dni: "", domicilio: "", telefono: "", email: "",
                    fechaServicio: "", categoria: "", tipo: "reclamo",
                    detalle: "", pedido: "", website: "", acepto: false,
                  });
                }}
                className="rounded-full border border-white/20 px-6 py-3 text-sm text-emerald-50/80 hover:text-white transition-colors"
              >
                Nuevo reclamo
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="glass rounded-2xl p-6 sm:p-8 space-y-6" noValidate>
            <input
              type="text" name="website" value={form.website}
              onChange={(e) => set("website", e.target.value)}
              autoComplete="off" tabIndex={-1} aria-hidden="true"
              className="absolute h-0 w-0 opacity-0 pointer-events-none"
            />

            <fieldset>
              <legend className="font-display text-xl text-gold mb-3">1. Datos del consumidor</legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="rc-nombres">Nombres y apellidos *</label>
                  <input id="rc-nombres" className={inputCls} value={form.nombres} maxLength={80}
                    onChange={(e) => set("nombres", e.target.value)} placeholder="Ej. Juan Pérez García" required />
                  {err("nombres")}
                </div>
                <div>
                  <label className={labelCls} htmlFor="rc-dni">DNI *</label>
                  <input id="rc-dni" className={inputCls} value={form.dni} maxLength={12} inputMode="numeric"
                    onChange={(e) => set("dni", e.target.value)} placeholder="Ej. 12345678" required />
                  {err("dni")}
                </div>
                <div>
                  <label className={labelCls} htmlFor="rc-tel">Teléfono *</label>
                  <input id="rc-tel" className={inputCls} value={form.telefono} maxLength={20}
                    onChange={(e) => set("telefono", e.target.value)} placeholder="Ej. 944 897 167" required />
                  {err("telefono")}
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="rc-dom">Domicilio *</label>
                  <input id="rc-dom" className={inputCls} value={form.domicilio} maxLength={120}
                    onChange={(e) => set("domicilio", e.target.value)} placeholder="Av./Jr./Calle, distrito" required />
                  {err("domicilio")}
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="rc-mail">Correo electrónico *</label>
                  <input id="rc-mail" type="email" className={inputCls} value={form.email} maxLength={80}
                    onChange={(e) => set("email", e.target.value)} placeholder="tucorreo@ejemplo.com" required />
                  {err("email")}
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-display text-xl text-gold mb-3">2. Detalle del servicio</legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} htmlFor="rc-fecha">Fecha del servicio *</label>
                  <input id="rc-fecha" type="date" className={inputCls} value={form.fechaServicio}
                    onChange={(e) => set("fechaServicio", e.target.value)} required />
                  {err("fechaServicio")}
                </div>
                <div>
                  <label className={labelCls} htmlFor="rc-cat">Categoría / sede</label>
                  <input id="rc-cat" className={inputCls} value={form.categoria} maxLength={30}
                    onChange={(e) => set("categoria", e.target.value)} placeholder="Ej. Formación · Parque Industrial" />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-display text-xl text-gold mb-3">3. Reclamo o queja</legend>
              <div className="flex gap-2 rounded-lg bg-black/30 p-1 mb-4" role="radiogroup" aria-label="Tipo">
                {[
                  { id: "reclamo", t: "Reclamo (disconformidad con el servicio)" },
                  { id: "queja", t: "Queja (malestar por la atención)" },
                ].map((o) => (
                  <button
                    key={o.id} type="button" role="radio" aria-checked={form.tipo === o.id}
                    onClick={() => set("tipo", o.id)}
                    className={`flex-1 rounded-md px-3 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                      form.tipo === o.id ? "bg-[#FFF200] text-[#070D1E]" : "text-emerald-50/70 hover:text-white"
                    }`}
                  >
                    {o.t}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelCls} htmlFor="rc-detalle">Detalle de lo ocurrido *</label>
                  <textarea id="rc-detalle" rows={4} maxLength={1000} className={`${inputCls} resize-y`}
                    value={form.detalle} onChange={(e) => set("detalle", e.target.value)}
                    placeholder="Describe con fechas y hechos lo sucedido…" required />
                  {err("detalle")}
                </div>
                <div>
                  <label className={labelCls} htmlFor="rc-pedido">Pedido del consumidor *</label>
                  <textarea id="rc-pedido" rows={2} maxLength={500} className={`${inputCls} resize-y`}
                    value={form.pedido} onChange={(e) => set("pedido", e.target.value)}
                    placeholder="Ej. Devolución del pago de la mensualidad…" required />
                  {err("pedido")}
                </div>
              </div>
            </fieldset>

            <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-emerald-50/75">
              <input
                type="checkbox" checked={form.acepto}
                onChange={(e) => set("acepto", e.target.checked)}
                required className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#00FF00]"
              />
              <span>
                He leído y acepto la{" "}
                <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-neon underline">
                  Política de Privacidad
                </a>{" "}
                para el tratamiento de mis datos personales. *
              </span>
            </label>
            {err("acepto")}

            <button
              type="submit"
              disabled={!form.acepto}
              className="w-full rounded-full bg-[#FFF200] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-[#070D1E] shadow-[0_0_24px_rgba(255,242,0,0.45)] hover:shadow-[0_0_36px_rgba(255,242,0,0.7)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[0_0_24px_rgba(255,242,0,0.45)]"
            >
              Registrar reclamo
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

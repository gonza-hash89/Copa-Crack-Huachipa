"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51944897167";

const categories = [
  { value: "sub08", label: "Sub-08 (hasta 8 años)" },
  { value: "sub10", label: "Sub-10 (hasta 10 años)" },
  { value: "sub12", label: "Sub-12 (hasta 12 años)" },
];

const initialFormData = {
  teamName: "",
  category: "",
  coachName: "",
  phone: "",
};

export default function RegisterForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateField = (name, value) => {
    switch (name) {
      case "teamName":
        if (!value.trim()) return "Nombre del equipo es obligatorio";
        if (value.trim().length < 3) return "Mínimo 3 caracteres";
        break;
      case "category":
        if (!value) return "Selecciona una categoría";
        break;
      case "coachName":
        if (!value.trim()) return "Nombre del profesor/entrenador es obligatorio";
        if (value.trim().length < 3) return "Mínimo 3 caracteres";
        break;
      case "phone":
        if (!value.trim()) return "Teléfono es obligatorio";
        if (!/^[\d\s+\-()]{9,}$/.test(value)) return "Formato de teléfono inválido";
        break;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const formatWhatsAppMessage = (data) => {
    const lines = [
      "🏆 *INSCRIPCIÓN COPA CRACK PERÚ*",
      "",
      `📋 *Equipo:* ${data.teamName}`,
      `🏷️ *Categoría:* ${categories.find(c => c.value === data.category)?.label || data.category}`,
      `👨‍🏫 *Profesor/Entrenador:* ${data.coachName}`,
      `📱 *Teléfono:* ${data.phone}`,
      "",
      "✅ Enviado desde la web oficial copacrackperu.com",
    ];
    return lines.join("%0A");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(initialFormData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("sending");

    try {
      const message = formatWhatsAppMessage(formData);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "generate_lead", {
          event_category: "inscripcion",
          event_label: "whatsapp_form",
          team_name: formData.teamName,
          category: formData.category,
        });
      }

      window.open(waUrl, "_blank", "noopener,noreferrer");
      setSubmitStatus("success");
      setFormData(initialFormData);
    } catch (err) {
      console.error("Error al abrir WhatsApp:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="inscripcion" className="px-4 py-16">
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <span className="badge-sharp">Inscripción</span>
          <h2 className="font-display mt-6 text-4xl sm:text-5xl text-gradient-gold" data-text="INSCRIPCIÓN">INSCRIPCIÓN EN LÍNEA</h2>
          <p className="mt-2 text-white/60">Completa el formulario y te contactaremos por WhatsApp</p>
        </div>

        <form onSubmit={handleSubmit} className="glass clip-path-polygon\(0_4px_4px_0_100%_0_100%_calc\(100%-4px\)_calc\(100%-4px\)_100%_0_100%\) p-6 sm:p-8 fade-in-up space-y-6" noValidate>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="teamName" className="form-label">Nombre del Equipo *</label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.teamName ? "border-red focus:border-red" : ""}`}
                placeholder="Ej: Academia Los Cracks FC"
                maxLength={60}
                required
                autoComplete="organization"
              />
              {errors.teamName && <p className="mt-1 text-sm text-red">{errors.teamName}</p>}
            </div>

            <div>
              <label htmlFor="category" className="form-label">Categoría *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23ffbe0b%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22/%3E%3C/svg%3E')] bg-[right_1rem_center] bg-no-repeat pr-10 ${errors.category ? "border-red focus:border-red" : ""}`}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="coachName" className="form-label">Profesor / Entrenador *</label>
              <input
                type="text"
                id="coachName"
                name="coachName"
                value={formData.coachName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.coachName ? "border-red focus:border-red" : ""}`}
                placeholder="Ej: Prof. Juan Pérez"
                maxLength={60}
                required
                autoComplete="name"
              />
              {errors.coachName && <p className="mt-1 text-sm text-red">{errors.coachName}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="form-label">Teléfono (WhatsApp) *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.phone ? "border-red focus:border-red" : ""}`}
                placeholder="+51 9XX XXX XXX"
                maxLength={20}
                required
                autoComplete="tel"
              />
              {errors.phone && <p className="mt-1 text-sm text-red">{errors.phone}</p>}
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-red/5 border border-red/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff1e27" strokeWidth="2" className="flex-shrink-0 mt-0.5 drop-shadow-[0_0_4px_rgba(255,30,39,0.6)]" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <div className="text-sm text-white/60">
              <p className="font-medium text-red">Protección de datos:</p>
              Al enviar, tus datos se formatean y abren directamente en WhatsApp. No almacenamos información sensible en nuestros servidores. Cumplimos Ley N° 29733.
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Abriendo WhatsApp...
              </>
            ) : (
              <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#050202" className="mr-2" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" />
                </svg>
                Enviar Inscripción por WhatsApp
              </>
            )}
          </button>

          {submitStatus === "success" && (
            <div className="text-center p-4 rounded-xl bg-green-500/20 border border-green-500/30 fade-in-up">
              <p className="text-green-400 font-medium">✅ ¡Formulario enviado! Se abrió WhatsApp con tu inscripción.</p>
              <p className="text-xs text-white/60 mt-1">Completa el envío en la app de WhatsApp.</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="text-center p-4 rounded-xl bg-red/20 border border-red/30 fade-in-up">
              <p className="text-red font-medium">❌ Error al abrir WhatsApp. Intenta de nuevo o escríbenos directamente.</p>
            </div>
          )}
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/60">¿Prefieres escribir directamente?</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero inscribir mi equipo en la Copa Crack Perú.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex mt-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffbe0b" aria-hidden="true" className="drop-shadow-[0_0_4px_rgba(255,190,11,0.6)]">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" />
            </svg>
            Abrir WhatsApp Directo
          </a>
        </div>
      </div>
    </section>
  );
}
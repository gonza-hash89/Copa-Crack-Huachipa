"use client";

import Logo from "./Logo";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51999999999";

const metrics = [
  { value: "14", label: "Academias" },
  { value: "3", label: "Categorías" },
  { value: "5ª", label: "Edición" },
];

const waUrl = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 pb-16 px-4 overflow-hidden">
      <div className="absolute inset-0 grass-field hero" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-left lg:text-left">
            <span className="badge-torneo">Torneo Formativo</span>

            <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl leading-tight">
              <span className="gold-gradient" data-text="COPA">COPA</span>
              <br />
              <span className="gold-gradient" data-text="CRACK PERÚ">CRACK PERÚ</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white-dim max-w-xl leading-relaxed">
              El torneo de fútbol formativo más emocionante de Huachipa. Categorías Sub-08, Sub-10 y Sub-12
              compitiendo en el Complejo Deportivo Cerro Camote. ¡Donde nacen los futuros cracks!
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#equipos"
                className="btn-primary"
              >
                Ver Equipos
              </a>
              <a
                href={waUrl("Hola, quiero inscribir mi equipo en la Copa Crack Perú.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Inscribirse por WhatsApp
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 sm:gap-10">
              {metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col items-start">
                  <span className="font-display text-4xl sm:text-5xl gold-gradient" data-text={metric.value}>
                    {metric.value}
                  </span>
                  <span className="text-sm text-white-dim uppercase tracking-wider mt-1">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:order-first">
            <div className="official-crest">
              <div className="official-crest-glow" aria-hidden="true" />
              <svg viewBox="0 0 90 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Escudo Oficial Copa Crack Perú - Torneo de Fútbol Formativo Huachipa">
                <defs>
                  <linearGradient id="crest-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#080404" />
                    <stop offset="100%" stopColor="#1a0a0a" />
                  </linearGradient>
                  <linearGradient id="crest-gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffd700" />
                    <stop offset="50%" stopColor="#e8c547" />
                    <stop offset="100%" stopColor="#ff8c00" />
                  </linearGradient>
                  <linearGradient id="crest-red" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c0392b" />
                    <stop offset="100%" stopColor="#e74c3c" />
                  </linearGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  d="M45 5 L85 20 V80 C85 92 68 98 45 98 C22 98 5 92 5 80 V20 Z"
                  fill="url(#crest-bg)"
                  stroke="url(#crest-gold)"
                  strokeWidth="3"
                  filter="url(#glow)"
                />

                <path
                  d="M45 5 L85 20 V45"
                  fill="url(#crest-red)"
                  opacity="0.3"
                />

                <ellipse cx="45" cy="42" rx="28" ry="18" fill="none" stroke="url(#crest-gold)" strokeWidth="2" opacity="0.5" />

                <text x="45" y="50" textAnchor="middle" fontFamily="Bebas Neue, Impact, sans-serif" fontSize="28" fill="url(#crest-gold)" fontWeight="bold" letterSpacing="2">CCP</text>

                <text x="45" y="72" textAnchor="middle" fontFamily="Bebas Neue, Impact, sans-serif" fontSize="14" fill="#e8c547" letterSpacing="3">FÚTBOL FORMATIVO</text>

                <text x="45" y="86" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#b89530" letterSpacing="1">HUACHIPA · LIMA · PERÚ</text>

                <path d="M45 55 L45 62" stroke="url(#crest-gold)" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
                <path d="M30 58 L60 58" stroke="url(#crest-gold)" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
              </svg>
            </div>

            <div className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 rounded-full glass border-gold/30 flex items-center justify-center" aria-hidden="true">
              <Logo size={56} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8c547" strokeWidth="2" opacity="0.6">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
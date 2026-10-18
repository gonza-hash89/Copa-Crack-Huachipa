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
              <span className="neon-title" data-text="COPA">COPA</span>
              <br />
              <span className="neon-title" data-text="CRACK PERÚ">CRACK PERÚ</span>
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
                  <span className="font-display text-4xl sm:text-5xl neon-title" data-text={metric.value}>
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
                    <stop offset="0%" stopColor="#050202" />
                    <stop offset="100%" stopColor="#0a0303" />
                  </linearGradient>
                  <linearGradient id="crest-neon" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFEB00" />
                    <stop offset="30%" stopColor="#FFD700" />
                    <stop offset="60%" stopColor="#FFEB00" />
                    <stop offset="100%" stopColor="#FFB300" />
                  </linearGradient>
                  <linearGradient id="crest-phosphor" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FF073A" />
                    <stop offset="100%" stopColor="#FF2D4A" />
                  </linearGradient>
                  <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  d="M45 5 L85 20 V80 C85 92 68 98 45 98 C22 98 5 92 5 80 V20 Z"
                  fill="url(#crest-bg)"
                  stroke="url(#crest-neon)"
                  strokeWidth="3"
                  filter="url(#neon-glow)"
                />

                <path
                  d="M45 5 L85 20 V45"
                  fill="url(#crest-phosphor)"
                  opacity="0.4"
                />

                <ellipse cx="45" cy="42" rx="28" ry="18" fill="none" stroke="url(#crest-neon)" strokeWidth="2" opacity="0.6" />

                <text x="45" y="50" textAnchor="middle" fontFamily="Bebas Neue, Impact, sans-serif" fontSize="28" fill="url(#crest-neon)" fontWeight="bold" letterSpacing="2" filter="url(#neon-glow)">CCP</text>

                <text x="45" y="72" textAnchor="middle" fontFamily="Bebas Neue, Impact, sans-serif" fontSize="14" fill="#FFEB00" letterSpacing="3" filter="drop-shadow(0 0 4px #FFEB00)">FÚTBOL FORMATIVO</text>

                <text x="45" y="86" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#FFD700" letterSpacing="1">HUACHIPA · LIMA · PERÚ</text>

                <path d="M45 55 L45 62" stroke="url(#crest-neon)" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
                <path d="M30 58 L60 58" stroke="url(#crest-neon)" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
              </svg>
            </div>

            <div className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 rounded-full glass border-neon-yellow/40 flex items-center justify-center" aria-hidden="true">
              <Logo size={56} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFEB00" strokeWidth="2" opacity="0.7">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
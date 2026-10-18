import Logo from "./Logo";

export const WHATSAPP = "51944897167";
export const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden">
      {/* Diagonal accent lines - decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-80 h-80 border-r-[240px] border-t-[240px] border-r-transparent border-t-gold/10 rotate-45" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 border-l-[240px] border-b-[240px] border-l-transparent border-b-red/10 rotate-45" />
        {/* Central spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gradient-to-r from-red/10 via-transparent to-gold/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* LEFT COLUMN - Content */}
          <div className="md:order-1 text-left enter enter-1">
            <span className="badge-sharp inline-block mb-6">Torneo de Fútbol Formativo</span>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.92] mb-6 text-gradient-gold tracking-tight">
              COPA <span className="block text-gold-bright">CRACK</span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed enter enter-2">
              Donde los futuros cracks juegan, aprenden y sueñan bajo las luces del estadio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 enter enter-3">
              <a
                href={wa("Hola, deseo inscribir a mi equipo en la Copa Crack Oficial (Enero 2027)")}
                target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto text-center"
              >
                Inscribe a tu academia
              </a>
              <a
                href="#equipos"
                className="btn-secondary w-full sm:w-auto text-center"
              >
                Ver Equipos
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN - Logo Card */}
          <div className="md:order-2 flex justify-center enter enter-4">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl aspect-square">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red/15 via-transparent to-gold/15 blur-2xl" />
              {/* Card with sharp angular cut */}
              <div className="relative w-full h-full bg-black/40 border-2 border-gold/30 clip-path-polygon\(0_0_100%_0_100%_88%_88%_100%_0_100%\) backdrop-blur-sm overflow-hidden">
                {/* Diagonal shine sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/10 to-transparent animate-shimmer" />
                <div className="absolute inset-0 bg-gradient-to-br from-red/5 via-transparent to-gold/5" />
                <Logo size={240} className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_80px_rgba(255,190,11,0.6)]" />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold/50" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-red/50" />
              <div className="absolute bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-red/50" />
              <div className="absolute bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold/50" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce enter enter-5">
          <span className="text-xs uppercase tracking-widest font-bold text-gold/50">Scroll</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold/50">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
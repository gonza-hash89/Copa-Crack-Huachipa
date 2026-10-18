import Logo from "./Logo";

const left = [["Equipos", "#equipos"], ["Historial", "#historial"]];
const right = [["Galería", "#galeria"], ["Contacto", "#contacto"]];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/50 backdrop-blur-md border-b border-gold/20" style={{ height: '80px' }}>
      <nav className="mx-auto max-w-7xl px-4 py-2 grid grid-cols-[1fr_auto_1fr] items-center h-full" aria-label="Principal">
        <div className="hidden sm:flex justify-end gap-1 pr-4">
          {left.map(([t, h]) => (
            <a key={h} href={h} className="px-3 py-2 text-sm font-bold uppercase tracking-wider text-white/80 hover:text-gold hover:bg-red/10 transition-colors clip-path-polygon\(0_3px_3px_0_100%_0_100%_calc\(100%-3px\)_calc\(100%-3px\)_100%_0_100%\)">
              {t}
            </a>
          ))}
        </div>
        <a href="#inicio" className="col-start-2 flex flex-col items-center" aria-label="Copa Crack, inicio">
          <Logo size={44} className="drop-shadow-[0_0_30px_rgba(255,190,11,0.5)]" />
        </a>
        <div className="hidden sm:flex gap-1 pl-4">
          {right.map(([t, h]) => (
            <a key={h} href={h} className="px-3 py-2 text-sm font-bold uppercase tracking-wider text-white/80 hover:text-gold hover:bg-red/10 transition-colors clip-path-polygon\(0_3px_3px_0_100%_0_100%_calc\(100%-3px\)_calc\(100%-3px\)_100%_0_100%\)">
              {t}
            </a>
          ))}
        </div>
      </nav>
      <div className="sm:hidden flex justify-center gap-1 pb-2">
        {[...left, ...right].map(([t, h]) => (
          <a key={h} href={h} className="px-3 py-2 text-sm font-bold uppercase tracking-wider text-white/80 hover:text-gold hover:bg-red/10 transition-colors clip-path-polygon\(0_3px_3px_0_100%_0_100%_calc\(100%-3px\)_calc\(100%-3px\)_100%_0_100%\)">
            {t}
          </a>
        ))}
      </div>
    </header>
  );
}
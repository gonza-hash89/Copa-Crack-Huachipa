"use client";

export default function Fixture() {
  return (
    <section id="fixture" className="px-4 py-16">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="badge-sharp">Próximos Partidos</span>
          <h2 className="font-display mt-6 text-4xl sm:text-5xl text-gradient-gold" data-text="FIXTURE">FIXTURE</h2>
          <p className="mt-2 text-white/60">Calendario completo por fechas</p>
        </div>

        <div className="table-container gold-border">
          <div className="glass-card clip-path-polygon\(0_4px_4px_0_100%_0_100%_calc\(100%-4px\)_calc\(100%-4px\)_100%_0_100%\) p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red/20 to-gold/20 border-2 border-gold/30 flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-gold-bright" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="font-display text-2xl sm:text-3xl text-gradient-gold mb-2">Próximamente</h3>
                <p className="text-white/60 max-w-md mx-auto">El calendario de partidos se publicará próximamente. El fixture se dará a conocer antes del inicio del torneo.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="badge-sharp text-xs">Fecha 1</span>
                <span className="badge-sharp text-xs bg-gradient-to-r from-white to-gray-200 text-gray-800">Fecha 2</span>
                <span className="badge-sharp text-xs">Fecha 3</span>
                <span className="badge-sharp text-xs bg-gradient-to-r from-white to-gray-200 text-gray-800">Fecha 4</span>
              </div>
              <p className="text-xs text-white/40 mt-2">El fixture se publicará antes del inicio del torneo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
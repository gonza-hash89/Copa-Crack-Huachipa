import Tilt from "./Tilt";

const QUERY = encodeURIComponent("Complejo Deportivo Parque Industrial, Huachipa, Lurigancho-Chosica");
const LL = "-11.9567,-76.8068";

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-10">
          <span className="inline-block rounded-full bg-neon/10 border border-neon/30 px-4 py-1 text-sm font-semibold text-neon mb-4">
            📍 Cómo llegar
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-center">Ubicación de la sede</h2>
        </header>

        <Tilt className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[#00FF00]/10 border border-[#00FF00]/40 text-3xl" aria-hidden="true">
              🏟️
            </div>
            <div className="flex-1">
              <h3 className="font-display text-2xl">Complejo Deportivo “Parque Industrial”</h3>
              <p className="mt-1 text-sm text-emerald-50/70">
                Huachipa / Lurigancho-Chosica · Plus Code 2372+44Q
              </p>
              <p className="mt-1 text-sm text-emerald-50/70">
                🕐 Martes y jueves · 5:30 PM – 7:00 PM
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${QUERY}`}
              target="_blank" rel="noopener noreferrer"
              className="rounded-full bg-[#00FF00] px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wide text-[#070D1E] shadow-[0_0_24px_rgba(0,255,0,0.45)] hover:shadow-[0_0_36px_rgba(0,255,0,0.7)] hover:-translate-y-0.5 transition-all"
            >
              Abrir ruta en Google Maps
            </a>
            <a
              href={`https://waze.com/ul?q=${QUERY}&ll=${LL}&navigate=yes`}
              target="_blank" rel="noopener noreferrer"
              className="rounded-full border border-cyan-400/50 bg-cyan-500/10 px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wide text-cyan-300 hover:bg-cyan-400 hover:text-[#070D1E] transition-colors"
            >
              Abrir ruta en Waze
            </a>
          </div>

          <p className="mt-4 text-center text-xs text-emerald-50/60">
            Ven 15 minutos antes con ropa deportiva, zapatillas y agua. La primera clase de prueba es gratis.
          </p>
        </Tilt>
      </div>
    </section>
  );
}

import Tilt from "./Tilt";

export default function CopaBanner() {
  return (
    <section id="copa-crack" className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <Tilt className="glass rounded-2xl p-8 text-center">
          <span className="copa-official-badge inline-block rounded-full px-5 py-2 text-sm font-bold text-gold">
            🏆 Participantes oficiales de la Copa Crack Perú
          </span>
          <h2 className="font-display text-4xl sm:text-5xl mt-4">
            COPA CRACK PERÚ
          </h2>
          <p className="mt-4 text-emerald-50/70">
            Sigue los partidos, tablas de posiciones y resultados del campeonato oficial
            donde compite nuestra escuela.
          </p>
          <a
            href="https://copacrackperu.com"
            target="_blank" rel="noopener noreferrer"
            className="btn-pulse-neon mt-6 inline-block rounded-full bg-[#FFF200] px-8 py-3 font-extrabold uppercase tracking-wide text-[#070D1E] transition-transform hover:-translate-y-1"
          >
            Ver Torneo Oficial ➔
          </a>
        </Tilt>
      </div>
    </section>
  );
}

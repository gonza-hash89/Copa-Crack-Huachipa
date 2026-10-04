import teams from "@/data/teams.json";

function Crest({ short, color }) {
  return (
    <svg width="72" height="80" viewBox="0 0 72 80" aria-hidden="true">
      <path d="M36 3 66 14v28c0 18-13 29-30 35C19 71 6 60 6 42V14z" fill="#07140d" stroke={color} strokeWidth="3" />
      <path d="M36 3 66 14v10H6V14z" fill={color} opacity=".25" />
      <text x="36" y="55" textAnchor="middle" fontFamily="Impact, sans-serif" fontSize="24" fill={color}>{short}</text>
    </svg>
  );
}

export default function Teams() {
  return (
    <section id="equipos" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl sm:text-5xl text-center">Equipos</h2>
        <p className="mt-4 mx-auto w-fit rounded-full border border-gold/60 bg-gold/10 px-5 py-2 text-sm text-gold">
          14 academias participantes del último campeonato
        </p>
        <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {teams.map((t) => (
            <li key={t.id} className="glass rounded-2xl p-4 flex flex-col items-center text-center hover:border-gold/60 transition-colors">
              <Crest short={t.short} color={t.color} />
              <span className="mt-3 text-sm font-medium leading-snug">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

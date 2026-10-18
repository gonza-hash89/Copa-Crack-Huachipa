"use client";

import { useState } from "react";
import pastTournaments from "@/data/past_tournaments.json";

const goldBadge = "bg-gradient-to-r from-yellow-300 via-yellow-200 to-amber-400 text-black font-bold shadow-[0_0_12px_rgba(255,235,0,0.6)]";
const silverBadge = "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 text-gray-900 font-bold shadow-[0_0_12px_rgba(200,200,200,0.5)]";

function Row({ label, name }) {
  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <span className="text-white-dim">{label}</span>
      <span className="font-medium text-white text-right">{name}</span>
    </div>
  );
}

function Cup({ title, badge, border, data }) {
  return (
    <div className={`rounded-xl border ${border} bg-black/30 p-4 glass`}>
      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${badge}`}>
        {title}
      </span>
      <div className="mt-3 space-y-2">
        <Row label="Campeón" name={data.campeon} />
        <Row label="Subcampeón" name={data.subcampeon} />
        {data.tercero && <Row label="3er Puesto" name={data.tercero} />}
        {data.goleador && <Row label="Goleador" name={data.goleador} />}
        {data.arquero && <Row label="Mejor Arquero" name={data.arquero} />}
      </div>
    </div>
  );
}

export default function PastTournaments() {
  const [openEdition, setOpenEdition] = useState(null);

  return (
    <section id="historial" className="px-4 py-16 grass-field tables">
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="badge-torneo">Historia</span>
          <h2 className="font-display mt-6 text-4xl sm:text-5xl neon-title" data-text="HISTORIAL">HISTORIAL DE CAMPEONES</h2>
          <p className="mt-2 text-white-dim">Todas las ediciones de la Copa Crack Perú</p>
        </div>

        <div className="space-y-4" role="region" aria-label="Ediciones del torneo">
          {pastTournaments.map((edition) => {
            const isOpen = openEdition === edition.id;
            return (
              <article
                key={edition.id}
                className="glass-strong rounded-2xl overflow-hidden sport-card"
              >
                <button
                  onClick={() => setOpenEdition(isOpen ? null : edition.id)}
                  aria-expanded={isOpen}
                  aria-controls={`edition-content-${edition.id}`}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/30 flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFEB00" strokeWidth="2" aria-hidden="true" className="drop-shadow-[0_0_6px_rgba(255,235,0,0.8)]">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-xl neon-title">{edition.name}</h3>
                      <p className="text-xs text-white-dim">{edition.categories.length} categorías · {edition.teams} equipos</p>
                    </div>
                  </div>
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#FFEB00"
  strokeWidth="2"
  className={`transition-transform drop-shadow-[0_0_6px_rgba(255,235,0,0.8)] ${isOpen ? "rotate-180" : ""}`}
  aria-hidden="true"
>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div
                  id={`edition-content-${edition.id}`}
                  role="region"
                  aria-label={`Detalles ${edition.name}`}
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"}`}
                >
                  <div className="px-6 space-y-4 border-t border-neon-yellow/20 pt-4">
                    {edition.categories.map((category) => (
                      <div key={category.category} className="space-y-3">
<h4 className="font-semibold text-neon-yellow flex items-center gap-2">
  <span className="w-2 h-2 rounded-full bg-neon-yellow" aria-hidden="true"></span>
  {category.category}
</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Cup
                            title="🏆 Copa Oro"
                            badge={goldBadge}
                            border="border-amber-400/50"
                            data={category.oro}
                          />
                          <Cup
                            title="🥈 Copa Plata"
                            badge={silverBadge}
                            border="border-slate-300/40"
                            data={category.plata}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {pastTournaments.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-white-dim">Próximamente se publicará el historial de campeones.</p>
          </div>
        )}
      </div>
    </section>
  );
}
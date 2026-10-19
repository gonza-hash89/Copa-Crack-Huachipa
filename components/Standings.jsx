"use client";

import { useState } from "react";

const categories = ["Sub-08", "Sub-10", "Sub-12"];

const columns = [
  { key: "pos", label: "Pos", width: "w-12" },
  { key: "team", label: "Equipo", width: "" },
  { key: "pj", label: "PJ", width: "w-14" },
  { key: "pg", label: "PG", width: "w-14" },
  { key: "pe", label: "PE", width: "w-14" },
  { key: "pp", label: "PP", width: "w-14" },
  { key: "gf", label: "GF", width: "w-14" },
  { key: "gc", label: "GC", width: "w-14" },
  { key: "dg", label: "DG", width: "w-16" },
  { key: "pts", label: "PTS", width: "w-16" },
];

function TeamCell({ team }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-10 flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-br from-red/30 to-gold/30 border-2 border-gold/50 shadow-[4px_4px_0_rgba(255,190,11,0.4)] flex items-center justify-center">
          <span className="font-black text-xl text-white drop-shadow-lg">{team.short}</span>
        </div>
      </div>
      <span className="font-medium text-white hidden sm:block">{team.name}</span>
      <span className="font-medium text-white sm:hidden">{team.short}</span>
    </div>
  );
}

function DGCell({ dg }) {
  const isPositive = dg > 0;
  const isNegative = dg < 0;
  return (
    <span className={`font-display ${isPositive ? "text-green-400" : isNegative ? "text-red" : "text-white/60"}`}>
      {isPositive ? "+" : ""}{dg}
    </span>
  );
}

export default function Standings() {
  const [activeCategory, setActiveCategory] = useState("Sub-08");

  return (
    <section id="posiciones" className="px-4 py-16">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="badge-sharp">Clasificación</span>
          <h2 className="font-display mt-6 text-4xl sm:text-5xl text-gradient-gold" data-text="POSICIONES">TABLA DE POSICIONES</h2>
          <p className="mt-2 text-white/60">Clasificación oficial por categoría</p>
        </div>

        <div className="tabs-list justify-center mb-8" role="tablist" aria-label="Categorías">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
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
                <p className="text-white/60 max-w-md mx-auto">La tabla de posiciones se actualizará al iniciar el próximo torneo. Las clasificaciones se publicarán tras la primera jornada.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="badge-sharp text-xs">Copa Oro</span>
                <span className="badge-sharp text-xs bg-gradient-to-r from-white to-gray-200 text-gray-800">Copa Plata</span>
              </div>
              <p className="text-xs text-white/40 mt-2">La clasificación se definirá tras la primera fecha del torneo.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2 justify-center">
            <span className="w-3 h-3 rounded bg-green-400" aria-hidden="true"></span>
            <span>Clasifica a Copa Oro</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="w-3 h-3 rounded bg-slate-400" aria-hidden="true"></span>
            <span>Clasifica a Copa Plata</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="w-3 h-3 rounded bg-amber-400" aria-hidden="true"></span>
            <span>Mejor Diferencia Goles</span>
          </div>
        </div>
      </div>
    </section>
  );
}
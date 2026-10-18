"use client";

import { useState } from "react";
import standings from "@/data/standings.json";

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

  const currentStandings = standings[activeCategory] || [];

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
          <table className="table" role="table" aria-label={`Tabla de posiciones ${activeCategory}`}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className={col.width} scope="col">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentStandings.map((team, index) => (
                <tr key={team.id} className={team.pos <= 2 ? "bg-gold/5" : ""}>
                  <td className="font-display text-gold-bright text-center">{team.pos}</td>
                  <td><TeamCell team={team.team} /></td>
                  <td className="text-center tabular-nums">{team.pj}</td>
                  <td className="text-center tabular-nums text-green-400">{team.pg}</td>
                  <td className="text-center tabular-nums text-yellow-400">{team.pe}</td>
                  <td className="text-center tabular-nums text-red">{team.pp}</td>
                  <td className="text-center tabular-nums text-green-400">{team.gf}</td>
                  <td className="text-center tabular-nums text-red">{team.gc}</td>
                  <td className="text-center"><DGCell dg={team.dg} /></td>
                  <td className="font-display text-gold-bright text-center tabular-nums">{team.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
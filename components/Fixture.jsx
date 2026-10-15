"use client";

import { useState } from "react";
import fixtures from "@/data/fixtures.json";

const statusStyles = {
  programado: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  en_vivo: "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse",
  finalizado: "bg-green-500/20 text-green-400 border-green-500/30",
  suspendido: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const statusLabels = {
  programado: "Programado",
  en_vivo: "EN VIVO",
  finalizado: "Finalizado",
  suspendido: "Suspendido",
};

export default function Fixture() {
  const [activeTab, setActiveTab] = useState(fixtures[0]?.jornada || 1);

  const jornadas = [...new Set(fixtures.map((f) => f.jornada))].sort((a, b) => a - b);
  const currentFixtures = fixtures.filter((f) => f.jornada === activeTab);

  return (
    <section id="fixture" className="px-4 py-16 grass-field tables">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="badge-torneo">Próximos Partidos</span>
          <h2 className="font-display mt-6 text-4xl sm:text-5xl gold-gradient" data-text="FIXTURE">FIXTURE</h2>
          <p className="mt-2 text-white-dim">Calendario completo por jornadas</p>
        </div>

        <div className="tabs-list justify-center mb-8" role="tablist" aria-label="Jornadas">
          {jornadas.map((j) => (
            <button
              key={j}
              role="tab"
              aria-selected={activeTab === j}
              aria-controls={`panel-jornada-${j}`}
              id={`tab-jornada-${j}`}
              onClick={() => setActiveTab(j)}
              className={`tab-btn ${activeTab === j ? "active" : ""}`}
            >
              Jornada {j}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {currentFixtures.map((match) => (
            <article
              key={match.id}
              className="glass-strong rounded-2xl p-5 grid grid-cols-[1fr_auto_1fr] gap-4 items-center sport-card"
              role="tabpanel"
              id={`panel-jornada-${activeTab}`}
              aria-labelledby={`tab-jornada-${activeTab}`}
            >
              <div className="flex items-center gap-4 text-right lg:text-right">
                <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 team-badge" style={{ "--team-color": match.local.color }}>
                  <span className="team-badge-initials">{match.local.short}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{match.local.name}</p>
                  <p className="text-xs text-white-dim">{match.local.category}</p>
                </div>
              </div>

              <div className="text-center px-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[match.status]}`}>
                    {match.status === "en_vivo" && <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5 animate-pulse" aria-hidden="true" />}
                    {statusLabels[match.status]}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <span className="font-display text-3xl text-gold tabular-nums">{match.score.local}</span>
                  <span className="text-white-dim">-</span>
                  <span className="font-display text-3xl text-gold tabular-nums">{match.score.visitante}</span>
                </div>
                <div className="flex items-center justify-center gap-4 mt-2 text-sm text-white-dim">
                  <span className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    {match.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {match.field}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-left">
                <div>
                  <p className="font-semibold text-white">{match.visitante.name}</p>
                  <p className="text-xs text-white-dim">{match.visitante.category}</p>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 team-badge" style={{ "--team-color": match.visitante.color }}>
                  <span className="team-badge-initials">{match.visitante.short}</span>
                </div>
              </div>
            </article>
          ))}

          {currentFixtures.length === 0 && (
            <div className="glass rounded-2xl p-12 text-center">
              <p className="text-white-dim">No hay partidos programados para esta jornada.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
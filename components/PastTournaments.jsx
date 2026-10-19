"use client";
import { useState } from "react";
import editions from "@/data/past_tournaments.json";

const goldBadge = "bg-gradient-to-r from-gold-bright to-gold text-red-dark font-bold px-3 py-1 text-xs clip-path-polygon\(0_15%_15%_0_100%_0_100%_85%_85%_100%_0_100%\)";
const silverBadge = "bg-gradient-to-r from-white to-gray-200 text-gray-800 font-bold px-3 py-1 text-xs clip-path-polygon\(0_15%_15%_0_100%_0_100%_85%_85%_100%_0_100%\)";

function Row({ label, name }) {
  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <span className="text-white/60">{label}</span>
      <span className="font-semibold text-right text-white">{name}</span>
    </div>
  );
}

function Cup({ title, badge, border, data }) {
  return (
    <div className={`rounded-none border-2 ${border} bg-black/30 p-4 clip-path-polygon\(0_4px_4px_0_100%_0_100%_calc\(100%-4px\)_calc\(100%-4px\)_100%_0_100%\)`}>
      <span className={`inline-block ${badge} mb-3`}>{title}</span>
      <div className="space-y-2">
        <Row label="Campeón" name={data.campeon} />
        <Row label="Subcampeón" name={data.subcampeon} />
      </div>
    </div>
  );
}

export default function PastTournaments() {
  const [open, setOpen] = useState(editions[0]?.id);
  return (
    <section id="historial" className="px-4 py-24 pb-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl sm:text-5xl text-center text-gradient-gold mb-10">Historial de campeones</h2>
        <p className="text-center text-white/60 mb-10">Ediciones 2025 y 2026 — Próximas ediciones en programación</p>
        <div className="space-y-3">
          {editions.map((ed) => {
            const isOpen = open === ed.id;
            return (
              <div key={ed.id} className="glass clip-path-polygon\(0_4px_4px_0_100%_0_100%_calc\(100%-4px\)_calc\(100%-4px\)_100%_0_100%\) overflow-hidden fade-in-up">
                <button
                  onClick={() => setOpen(isOpen ? null : ed.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-display text-2xl text-white">{ed.name}</span>
                  <span className={`text-gold transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true">▼</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 space-y-4 border-t border-white/10">
                    {ed.categories.map((c) => (
                      <div key={c.category}>
                        <h3 className="mb-3 font-semibold text-gold uppercase tracking-wide">{c.category}</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Cup title="🏆 Copa Oro" badge={goldBadge} border="border-2 border-gold/50" data={c.oro} />
                          <Cup title="🥈 Copa Plata" badge={silverBadge} border="border-2 border-white/30" data={c.plata} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
"use client";
import { useState } from "react";
import editions from "@/data/past_tournaments.json";

const goldBadge = "bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950";
const silverBadge = "bg-gradient-to-r from-slate-300 to-slate-100 text-slate-800";

function Row({ label, name }) {
  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <span className="text-emerald-50/60">{label}</span>
      <span className="font-medium text-right">{name}</span>
    </div>
  );
}

function Cup({ title, badge, border, data }) {
  return (
    <div className={`rounded-xl border ${border} bg-black/20 p-3`}>
      <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold ${badge}`}>{title}</span>
      <div className="mt-2 space-y-1">
        <Row label="Campeón" name={data.campeon} />
        <Row label="Subcampeón" name={data.subcampeon} />
      </div>
    </div>
  );
}

export default function PastTournaments() {
  const [open, setOpen] = useState(editions[0]?.id);
  return (
    <section id="historial" className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl sm:text-5xl text-center">Historial de campeones</h2>
        <div className="mt-10 space-y-3">
          {editions.map((ed) => {
            const isOpen = open === ed.id;
            return (
              <div key={ed.id} className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : ed.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-display text-2xl">{ed.name}</span>
                  <span className={`text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true">▼</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 space-y-4">
                    {ed.categories.map((c) => (
                      <div key={c.category}>
                        <h3 className="mb-2 font-semibold text-neon">{c.category}</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <Cup title="🏆 Copa Oro" badge={goldBadge} border="border-amber-400/50" data={c.oro} />
                          <Cup title="🥈 Copa Plata" badge={silverBadge} border="border-slate-300/40" data={c.plata} />
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

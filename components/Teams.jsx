"use client";

import { useState } from "react";
import teams from "@/data/teams.json";

const categories = ["Todas", "Sub-08", "Sub-10", "Sub-12"];

function TeamBadge({ short, color, crestUrl }) {
  const [imgError, setImgError] = useState(false);

  if (crestUrl && !imgError) {
    return (
      <div className="relative w-20 h-24 mx-auto team-badge" style={{ "--team-color": color }}>
        <img
          src={crestUrl}
          alt=""
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          loading="lazy"
          aria-hidden="true"
        />
        <span className="team-badge-initials" style={{ opacity: 0 }}>{short}</span>
      </div>
    );
  }

  return (
    <div className="relative w-20 h-24 mx-auto team-badge" style={{ "--team-color": color }} role="img" aria-label={`Escudo de ${short}`}>
      <span className="team-badge-initials">{short}</span>
    </div>
  );
}

export default function Teams() {
  const [activeCategory, setActiveCategory] = useState("Todas");

  const filteredTeams = activeCategory === "Todas"
    ? teams
    : teams.filter((t) => t.category === activeCategory);

  return (
    <section id="equipos" className="px-4 py-16 grass-field tables">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="badge-torneo">Participantes</span>
          <h2 className="font-display mt-6 text-4xl sm:text-5xl neon-title" data-text="EQUIPOS">EQUIPOS</h2>
          <p className="mt-2 text-white-dim">Academias inscritas por categoría</p>
        </div>

        <div className="tabs-list justify-center mb-10" role="tablist" aria-label="Categorías">
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

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6" role="list" aria-label={`Equipos ${activeCategory !== "Todas" ? `categoría ${activeCategory}` : ""}`}>
          {filteredTeams.map((team) => (
            <li key={team.id} className="glass-strong rounded-2xl p-5 sport-card text-center group">
              <TeamBadge short={team.short} color={team.color} crestUrl={team.crestUrl} />
              <h3 className="mt-4 font-semibold text-white leading-snug group-hover:text-gold transition-colors">{team.name}</h3>
              <p className="mt-1 text-xs text-white-dim uppercase tracking-wider">{team.category}</p>
              {team.group && <p className="mt-1 text-xs text-gold-dim font-medium">Grupo {team.group}</p>}
            </li>
          ))}

          {filteredTeams.length === 0 && (
            <li className="col-span-full glass rounded-2xl p-12 text-center">
              <p className="text-white-dim">No hay equipos en esta categoría.</p>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
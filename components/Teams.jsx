"use client";

import { useState } from "react";
import teams from "@/data/teams.json";
import Image from "next/image";

function Crest({ short, color, logo }) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={`${short} crest`}
        width={80}
        height={80}
        className="w-20 h-20 object-contain filter drop-shadow-lg"
      />
    );
  }
  return (
    <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-red/30 to-gold/30 border-2 border-gold/50 shadow-[4px_4px_0_rgba(255,190,11,0.4)]">
      <span className="font-black text-2xl text-white drop-shadow-lg">{short}</span>
    </div>
  );
}

export default function Teams() {
  // Filter teams by category
  const categories = ["Sub-08", "Sub-10", "Sub-12"];
  const [activeCategory, setActiveCategory] = useState("Sub-08");

  const filteredTeams = teams.filter(t => t.category === activeCategory);

  return (
    <section id="equipos" className="px-4 pt-24 pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-gradient-gold tracking-tight">Equipos</h2>
          <p className="mt-3 text-white/60 text-lg font-medium uppercase tracking-wide">14 Academias Participantes</p>
        </div>

        {/* Category filters */}
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

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredTeams.map((t, i) => (
            <li 
              key={t.id} 
              className="relative glass p-4 flex flex-col items-center text-center transition-all duration-200 hover:border-gold hover:border-2 hover:shadow-[8px_8px_0_rgba(255,190,11,0.3)] hover:-translate-y-1 hover:-translate-x-1 fade-in-up" 
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red to-gold" />
              <Crest short={t.short} color={t.color} logo={t.logo} />
              <span className="mt-4 text-sm font-bold leading-snug text-white uppercase tracking-wide">{t.name}</span>
              <span className="text-xs text-white/60 uppercase tracking-wider mt-1">{t.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
"use client";
import { useState } from "react";
import Tilt from "./Tilt";
import { wa } from "./Hero";

const KITS = [
  {
    id: "titular",
    nombre: "Camiseta Titular",
    badge: "Titular",
    badgeClass: "bg-cyan-500/20 border-cyan-400 text-cyan-300",
    jersey: "#00A2E8",
    trim: "#FFF200",
    parts: [
      { icon: "👕", name: "Camiseta", color: "linear-gradient(90deg, #00A2E8, #0088C0)" },
      { icon: "🩳", name: "Short", color: "#0088C0" },
      { icon: "🧦", name: "Medias", color: "linear-gradient(180deg, #00A2E8, #0088C0)" },
    ],
    msg: "Hola, deseo información sobre tallas de la Camiseta Titular Lucmar",
  },
  {
    id: "alternativa",
    nombre: "Camiseta Alternativa",
    badge: "Alternativa",
    badgeClass: "bg-gold/20 border-gold text-gold",
    jersey: "#FFFFFF",
    trim: "#00FF00",
    parts: [
      { icon: "👕", name: "Camiseta", color: "linear-gradient(90deg, #FFFFFF, #EEEEEE)" },
      { icon: "🩳", name: "Short", color: "#FFFFFF" },
      { icon: "🧦", name: "Medias", color: "linear-gradient(180deg, #FFFFFF, #CCCCCC)" },
    ],
    msg: "Hola, deseo información sobre tallas de la Camiseta Alternativa Lucmar",
  },
];

function Jersey({ jersey, trim, back, label }) {
  return (
    <svg viewBox="0 0 300 400" className="w-full h-auto" role="img" aria-label={label}>
      <path
        d="M150 20 C80 20 30 70 30 140 L30 350 L270 350 L270 140 C270 70 220 20 150 20 Z"
        fill={jersey} stroke={trim} strokeWidth="2"
      />
      <path d="M110 80 Q150 60 190 80" fill="none" stroke={trim} strokeWidth="3" />
      <rect x="90" y="100" width="120" height="8" fill={trim} rx="2" />
      <rect x="85" y="130" width="130" height="6" fill={trim} rx="2" />
      <rect x="80" y="160" width="140" height="8" fill={trim} rx="2" />
      {back ? (
        <>
          <circle cx="150" cy="220" r="45" fill="rgba(0,0,0,0.12)" stroke={trim} strokeWidth="2" />
          <text x="150" y="232" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="40" fontWeight="800" fill={trim}>10</text>
          <text x="150" y="150" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="16" fontWeight="700" fill={trim}>APELLIDO</text>
        </>
      ) : (
        <>
          <rect x="100" y="200" width="100" height="60" fill="rgba(0,0,0,0.12)" stroke={trim} strokeWidth="1" rx="4" />
          <text x="150" y="238" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="14" fontWeight="700" fill={trim}>LUCMAR</text>
        </>
      )}
    </svg>
  );
}

function KitCard({ kit }) {
  const [view, setView] = useState("front");
  const tab = (v) =>
    `flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
      view === v ? "bg-[#FFF200] text-[#070D1E]" : "text-emerald-50/70 hover:text-white"
    }`;

  return (
    <Tilt className="glass rounded-2xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${kit.badgeClass}`}>
          {kit.badge}
        </span>
        <h3 className="font-display text-xl">{kit.nombre}</h3>
      </div>
      <div className="flex gap-2 mb-6 rounded-lg bg-black/30 p-1" role="tablist" aria-label={`Vistas de ${kit.nombre}`}>
        <button role="tab" aria-selected={view === "front"} onClick={() => setView("front")} className={tab("front")}>
          Frente
        </button>
        <button role="tab" aria-selected={view === "back"} onClick={() => setView("back")} className={tab("back")}>
          Espalda
        </button>
      </div>
      <div key={view} className="kit-view-enter mx-auto w-full max-w-[280px]">
        <Jersey jersey={kit.jersey} trim={kit.trim} back={view === "back"} label={`${kit.nombre} vista ${view === "front" ? "frontal" : "trasera"}`} />
      </div>
      <div className="grid grid-cols-3 gap-2 mt-6 mb-6">
        {kit.parts.map((p) => (
          <div key={p.name} className="rounded-lg bg-black/30 border border-white/10 p-2 text-center">
            <span className="text-xl" aria-hidden="true">{p.icon}</span>
            <span className="block text-xs font-semibold mt-1">{p.name}</span>
            <span className="block h-1.5 rounded-full mt-1" style={{ background: p.color }} />
          </div>
        ))}
      </div>
      <a
        href={wa(kit.msg)}
        target="_blank" rel="noopener noreferrer"
        className="mt-auto w-full rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold hover:bg-gold hover:text-night transition-colors text-center"
      >
        Consultar Tallas Disponibles por WhatsApp
      </a>
    </Tilt>
  );
}

export default function Uniformes() {
  return (
    <section id="uniforme" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="text-center mb-12">
          <span className="inline-block rounded-full bg-neon/10 border border-neon/30 px-4 py-1 text-sm font-semibold text-neon mb-4">
            👕 Equipamiento
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-center">Indumentaria Oficial Lucmar</h2>
          <p className="mt-4 max-w-2xl mx-auto text-emerald-50/70">
            Diseñada para el alto rendimiento y comodidad de nuestros alumnos en cada entrenamiento y partido.
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {KITS.map((k) => (
            <KitCard key={k.id} kit={k} />
          ))}
        </div>
      </div>
    </section>
  );
}

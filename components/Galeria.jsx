"use client";
import { useEffect, useState } from "react";

const FILTERS = ["Todas", "Entrenamientos", "Copa Crack & Torneos", "Sede Huachipa"];

const PHOTOS = [
  {
    id: 1,
    title: "Calentamiento en equipo",
    category: "Entrenamientos",
    url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80",
  },
  {
    id: 2,
    title: "Final bajo las luces",
    category: "Copa Crack & Torneos",
    url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
  },
  {
    id: 3,
    title: "Disputa del balón",
    category: "Copa Crack & Torneos",
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
  },
  {
    id: 4,
    title: "Jugada de ataque",
    category: "Entrenamientos",
    url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80",
  },
  {
    id: 5,
    title: "Plantel de la escuela",
    category: "Sede Huachipa",
    url: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&q=80",
  },
  {
    id: 6,
    title: "Formación antes del partido",
    category: "Sede Huachipa",
    url: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&q=80",
  },
  {
    id: 7,
    title: "Celebración del equipo",
    category: "Copa Crack & Torneos",
    url: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=1200&q=80",
  },
  {
    id: 8,
    title: "Tribuna del complejo",
    category: "Sede Huachipa",
    url: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=80",
  },
];

export default function Galeria() {
  const [filter, setFilter] = useState("Todas");
  const [index, setIndex] = useState(null);

  const list = filter === "Todas" ? PHOTOS : PHOTOS.filter((p) => p.category === filter);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % list.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, list.length]);

  const current = index !== null ? list[index] : null;

  return (
    <section id="galeria" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="text-center mb-8">
          <span className="inline-block rounded-full bg-neon/10 border border-neon/30 px-4 py-1 text-sm font-semibold text-neon mb-4">
            📸 Galería
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-center">Galería de Acción</h2>
          <p className="mt-4 max-w-2xl mx-auto text-emerald-50/70">
            Entrenamientos, torneos y nuestra sede en Huachipa.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setIndex(null); }}
              aria-pressed={filter === f}
              className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${
                filter === f
                  ? "bg-[#00FF00] text-[#070D1E] font-bold border-[#00FF00] shadow-[0_0_20px_rgba(0,255,0,0.45)]"
                  : "glass text-emerald-50/80 hover:text-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {list.map((p, i) => (
            <li key={p.id}>
              <button
                onClick={() => setIndex(i)}
                className="group relative block w-full aspect-square overflow-hidden rounded-2xl border border-[#00FF00]/40 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:border-[#00FF00] hover:shadow-[0_0_28px_rgba(0,255,0,0.35)] transition-all"
                aria-label={`Ampliar ${p.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.url}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 text-left">
                  <span className="block text-xs font-semibold">{p.title}</span>
                  <span className="block text-[10px] uppercase tracking-wider text-[#00FF00]">{p.category}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={() => setIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        >
          <button onClick={() => setIndex(null)} aria-label="Cerrar" className="absolute top-4 right-4 text-3xl text-white/80 hover:text-gold">×</button>
          <button
            onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + list.length) % list.length); }}
            aria-label="Anterior"
            className="absolute left-3 text-4xl text-white/80 hover:text-gold"
          >
            ‹
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-full max-w-4xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.url} alt={current.title} className="max-h-[80vh] w-auto rounded-xl mx-auto border border-[#00FF00]/40" />
            <figcaption className="mt-3 text-center text-sm text-emerald-50/80">
              {current.title} · <span className="text-[#00FF00]">{current.category}</span>
            </figcaption>
          </figure>
          <button
            onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % list.length); }}
            aria-label="Siguiente"
            className="absolute right-3 text-4xl text-white/80 hover:text-gold"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

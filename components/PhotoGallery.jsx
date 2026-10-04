"use client";
import { useEffect, useState } from "react";
import photos from "@/data/gallery.json";

const filters = ["Todas", "Premiación", "Partidos", "Equipos"];

export default function PhotoGallery() {
  const [filter, setFilter] = useState("Todas");
  const [index, setIndex] = useState(null);
  const list = filter === "Todas" ? photos : photos.filter((p) => p.category === filter);

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
        <h2 className="font-display text-4xl sm:text-5xl text-center">Galería</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setIndex(null); }}
              aria-pressed={filter === f}
              className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${filter === f ? "bg-neon text-night border-neon" : "glass text-emerald-50/80 hover:text-gold"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {list.map((p, i) => (
            <li key={p.id}>
              <button onClick={() => setIndex(i)} className="group relative block w-full aspect-square overflow-hidden rounded-2xl glass" aria-label={`Ver ${p.title}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-xs">{p.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {current && (
        <div role="dialog" aria-modal="true" aria-label={current.title} onClick={() => setIndex(null)}
             className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button onClick={() => setIndex(null)} aria-label="Cerrar" className="absolute top-4 right-4 text-3xl text-white/80 hover:text-gold">×</button>
          <button onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + list.length) % list.length); }} aria-label="Anterior" className="absolute left-3 text-4xl text-white/80 hover:text-gold">‹</button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-full max-w-4xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.url} alt={current.title} className="max-h-[80vh] w-auto rounded-xl mx-auto" />
            <figcaption className="mt-3 text-center text-sm text-emerald-50/80">{current.title} · {current.category}</figcaption>
          </figure>
          <button onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % list.length); }} aria-label="Siguiente" className="absolute right-3 text-4xl text-white/80 hover:text-gold">›</button>
        </div>
      )}
    </section>
  );
}

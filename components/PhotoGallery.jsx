"use client";

import { useState, useEffect } from "react";
import photos from "@/data/gallery.json";

const filters = ["Todas", "Premiación", "Partidos", "Equipos", "Entrenamientos"];

export default function PhotoGallery() {
  const [filter, setFilter] = useState("Todas");
  const [modalIndex, setModalIndex] = useState(null);
  const [modalDirection, setModalDirection] = useState(0);

  const filteredPhotos = filter === "Todas"
    ? photos
    : photos.filter((p) => p.category === filter);

  useEffect(() => {
    if (modalIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") { setModalIndex(null); setModalDirection(0); }
      if (e.key === "ArrowRight") { setModalDirection(1); setModalIndex((i) => (i + 1) % filteredPhotos.length); }
      if (e.key === "ArrowLeft") { setModalDirection(-1); setModalIndex((i) => (i - 1 + filteredPhotos.length) % filteredPhotos.length); }
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [modalIndex, filteredPhotos.length]);

  const currentPhoto = modalIndex !== null ? filteredPhotos[modalIndex] : null;

  const openModal = (index) => {
    setModalIndex(index);
    setModalDirection(0);
  };

  const closeModal = () => {
    setModalIndex(null);
    setModalDirection(0);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setModalDirection(1);
    setModalIndex((i) => (i + 1) % filteredPhotos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setModalDirection(-1);
    setModalIndex((i) => (i - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section id="galeria" className="px-4 py-16 grass-field tables">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="badge-torneo">Multimedia</span>
          <h2 className="font-display mt-6 text-4xl sm:text-5xl neon-title" data-text="GALERÍA">GALERÍA DE FOTOS</h2>
          <p className="mt-2 text-white-dim">Los mejores momentos del torneo</p>
        </div>

        <div className="tabs-list justify-center mb-10" role="tablist" aria-label="Filtros de galería">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => { setFilter(f); setModalIndex(null); }}
              className={`tab-btn ${filter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" role="list" aria-label={`Fotos categoría ${filter}`}>
          {filteredPhotos.map((photo, index) => (
            <li key={photo.id}>
              <button
                onClick={() => openModal(index)}
                className="sport-card w-full aspect-square group glass-strong overflow-hidden relative"
                aria-label={`Ver ${photo.title}`}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="sport-card-img w-full h-full object-cover"
                  width="400"
                  height="400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-semibold text-white text-sm">{photo.title}</p>
                  <p className="text-xs text-neon-yellow uppercase tracking-wider">{photo.category}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                  <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center border border-gold/30">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFEB00" strokeWidth="2" aria-hidden="true" className="drop-shadow-[0_0_4px_rgba(255,235,0,0.8)]">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                </div>
              </button>
            </li>
          ))}

          {filteredPhotos.length === 0 && (
            <li className="col-span-full glass rounded-2xl p-12 text-center">
              <p className="text-white-dim">No hay fotos en esta categoría.</p>
            </li>
          )}
        </ul>
      </div>

      {currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentPhoto.title}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
        >
<button
  onClick={closeModal}
  aria-label="Cerrar galería"
  className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-neon-yellow hover:bg-neon-yellow/10 transition-colors"
>
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFEB00" strokeWidth="2" aria-hidden="true" className="drop-shadow-[0_0_4px_rgba(255,235,0,0.6)]">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
</button>

<button
  onClick={prevPhoto}
  aria-label="Foto anterior"
  className="absolute left-4 z-10 w-14 h-14 rounded-full glass flex items-center justify-center text-white hover:text-neon-yellow hover:bg-neon-yellow/10 transition-colors hidden sm:block"
>
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFEB00" strokeWidth="2" aria-hidden="true" className="drop-shadow-[0_0_4px_rgba(255,235,0,0.6)]">
    <path d="M15 18l-6-6 6-6" />
  </svg>
</button>

          <figure onClick={(e) => e.stopPropagation()} className="relative max-w-5xl max-h-[85vh] w-full">
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="max-h-[85vh] w-auto rounded-xl mx-auto object-contain"
              style={{
                transform: `translateX(${modalDirection * 20}px)`,
                opacity: modalDirection === 0 ? 1 : 0.5,
              }}
            />
            <figcaption className="mt-4 text-center text-sm text-white-dim">
              {currentPhoto.title} · {currentPhoto.category}
            </figcaption>
          </figure>

<button
  onClick={nextPhoto}
  aria-label="Siguiente foto"
  className="absolute right-4 z-10 w-14 h-14 rounded-full glass flex items-center justify-center text-white hover:text-neon-yellow hover:bg-neon-yellow/10 transition-colors hidden sm:block"
>
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFEB00" strokeWidth="2" aria-hidden="true" className="drop-shadow-[0_0_4px_rgba(255,235,0,0.6)]">
    <path d="M9 18l6-6-6-6" />
  </svg>
</button>
        </div>
      )}
    </section>
  );
}
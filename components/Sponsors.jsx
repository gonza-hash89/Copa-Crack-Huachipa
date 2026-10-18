"use client";

import { useState, useEffect, useRef } from "react";
import sponsors from "@/data/sponsors.json";

export default function Sponsors() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) setVisibleCount(1.2);
      else if (window.innerWidth < 1024) setVisibleCount(2.5);
      else setVisibleCount(4);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => goToSlide((currentIndex + 1) % sponsors.length);
  const prevSlide = () => goToSlide((currentIndex - 1 + sponsors.length) % sponsors.length);

  return (
    <section id="patrocinadores" className="px-4 py-16 grass-field tables">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="badge-torneo">Aliados</span>
          <h2 className="font-display mt-6 text-4xl sm:text-5xl neon-title" data-text="PATROCINADORES">PATROCINADORES OFICIALES</h2>
          <p className="mt-2 text-white-dim">Empresas que apoyan el fútbol formativo</p>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-hidden pb-4"
            role="region"
            aria-label="Carrusel de patrocinadores"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {sponsors.map((sponsor, index) => (
              <div
                key={sponsor.id}
                className={`flex-shrink-0 transition-all duration-500 ${
                  index === currentIndex ? "scale-105 opacity-100" : "opacity-70"
                }`}
                style={{
                  minWidth: `calc(100% / ${visibleCount} - ${(visibleCount - 1) * 1.5}rem)`,
                }}
              >
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-strong rounded-2xl p-6 sport-card h-full flex items-center justify-center group"
                  aria-label={`Visitar ${sponsor.name}`}
                >
                  {sponsor.logoUrl ? (
                    <img
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      loading="lazy"
                      className="max-h-20 max-w-full object-contain filter grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
                      width="200"
                      height="80"
                    />
                  ) : (
<div className="w-32 h-16 rounded-xl bg-gradient-to-r from-neon-yellow/20 to-phosphor-red/20 flex items-center justify-center border border-neon-yellow/30">
  <span className="font-display text-neon-yellow text-xl">{sponsor.name.substring(0, 3).toUpperCase()}</span>
</div>
                  )}
                </a>
              </div>
            ))}
          </div>

          {sponsors.length > visibleCount && (
            <>
<button
  onClick={prevSlide}
  aria-label="Patrocinador anterior"
  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-4 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-neon-yellow hover:bg-neon-yellow/10 transition-colors hidden sm:block"
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFEB00" strokeWidth="2" aria-hidden="true" className="drop-shadow-[0_0_4px_rgba(255,235,0,0.6)]">
    <path d="M15 18l-6-6 6-6" />
  </svg>
</button>
<button
  onClick={nextSlide}
  aria-label="Siguiente patrocinador"
  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-4 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-neon-yellow hover:bg-neon-yellow/10 transition-colors hidden sm:block"
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFEB00" strokeWidth="2" aria-hidden="true" className="drop-shadow-[0_0_4px_rgba(255,235,0,0.6)]">
    <path d="M9 18l6-6-6-6" />
  </svg>
</button>
            </>
          )}

          <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Indicadores de patrocinadores">
            {sponsors.map((_, index) => (
<button
  key={index}
  role="tab"
  aria-selected={index === currentIndex}
  aria-label={`Ir a patrocinador ${index + 1}`}
  onClick={() => goToSlide(index)}
  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
    index === currentIndex
      ? "bg-neon-yellow w-8 shadow-[0_0_12px_rgba(255,235,0,0.8)]"
      : "bg-white/30 hover:bg-neon-yellow/50"
  }`}
/>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {sponsors.filter((s) => s.tier === "gold").map((sponsor) => (
<a
  key={sponsor.id}
  href={sponsor.url}
  target="_blank"
  rel="noopener noreferrer"
  className="glass rounded-xl p-4 sport-card flex items-center justify-center border-neon-yellow/30 hover:border-neon-yellow/60 transition-colors group"
>
  {sponsor.logoUrl ? (
    <img
      src={sponsor.logoUrl}
      alt={sponsor.name}
      loading="lazy"
      className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
    />
  ) : (
    <span className="font-display text-neon-yellow text-lg">{sponsor.name}</span>
  )}
</a>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useRef, useEffect } from "react";
import sponsors from "@/data/sponsors.json";

export default function Sponsors() {
  const tickerRef = useRef(null);
  const sponsorsRef = useRef(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    const content = sponsorsRef.current;
    if (!ticker || !content) return;

    // Clone content for seamless loop
    const clone = content.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    ticker.appendChild(clone);

    // Calculate animation duration based on content width
    // ~50px per second for smooth movement
    const contentWidth = content.scrollWidth;
    const duration = Math.max(20, contentWidth / 50); // seconds

    const style = document.createElement("style");
    style.textContent = `
      @keyframes ticker-${Date.now()} {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${contentWidth}px); }
      }
      .ticker-content {
        animation: ticker-${Date.now()} ${duration}s linear infinite;
        width: max-content;
      }
      .ticker-content:hover {
        animation-play-state: paused;
      }
      @media (prefers-reduced-motion: reduce) {
        .ticker-content { animation: none; }
      }
    `;
    document.head.appendChild(style);

    // Apply animation class
    content.classList.add("ticker-content");
    content.style.setProperty("--ticker-duration", `${duration}s`);

    return () => {
      document.head.removeChild(style);
      ticker.removeChild(clone);
      content.classList.remove("ticker-content");
    };
  }, []);

  return (
    <section id="patrocinadores" className="px-4 py-16">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="badge-sharp">Aliados</span>
          <h2 className="font-display mt-6 text-4xl sm:text-5xl text-gradient-gold" data-text="PATROCINADORES">PATROCINADORES OFICIALES</h2>
          <p className="mt-2 text-white/60">Empresas que apoyan el fútbol formativo</p>
        </div>

        {/* Infinite Auto-Scroll Carousel (Seamless Ticker) */}
        <div className="relative overflow-hidden" role="region" aria-label="Carrusel automático de patrocinadores">
          <div ref={tickerRef} className="flex gap-8" role="list" aria-label="Patrocinadores oficiales">
            <div ref={sponsorsRef} className="flex gap-8" role="list" aria-label="Patrocinadores oficiales">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="flex-shrink-0 w-48 sm:w-56 md:w-64"
                  role="listitem"
                >
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card clip-path-polygon\(0_2%_2%_0_100%_0_100%_98%_98%_100%_0_100%\) p-4 h-full flex items-center justify-center group transition-all duration-300 hover:border-gold-bright hover:shadow-[0_0_20px_rgba(255,190,11,0.2)] hover:-translate-y-1"
                    aria-label={`Visitar ${sponsor.name}`}
                  >
                    {sponsor.logoUrl ? (
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        loading="lazy"
                        className="max-h-16 max-w-full object-contain filter grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
                        width="160"
                        height="64"
                      />
                    ) : (
                      <div className="w-28 h-14 rounded-xl bg-gradient-to-r from-red/20 to-gold/20 flex items-center justify-center border border-gold/30">
                        <span className="font-display text-gold-bright text-base">{sponsor.name.substring(0, 3).toUpperCase()}</span>
                      </div>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient fade edges */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background via-background/80 to-transparent" />
          </div>
        </div>

        {/* Gold tier sponsors grid below ticker */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {sponsors.filter((s) => s.tier === "gold").map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card clip-path-polygon\(0_4px_4px_0_100%_0_100%_calc\(100%-4px\)_calc\(100%-4px\)_100%_0_100%\) p-4 flex items-center justify-center border-gold/30 hover:border-gold/60 transition-all duration-300 group"
            >
              {sponsor.logoUrl ? (
                <img
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  loading="lazy"
                  className="max-h-14 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <span className="font-display text-gold-bright text-lg">{sponsor.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
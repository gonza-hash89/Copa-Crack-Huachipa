"use client";
import { useState } from "react";
import Tilt from "./Tilt";
import { wa } from "./Hero";

/**
 * CONVENCIÓN DE ARCHIVOS (colocar las fotos reales aquí):
 *   /public/images/uniformes/titular-camiseta-frente.jpg
 *   /public/images/uniformes/titular-camiseta-espalda.jpg
 *   /public/images/uniformes/titular-short-frente.jpg
 *   /public/images/uniformes/titular-short-espalda.jpg
 *   /public/images/uniformes/titular-medias-frente.jpg
 *   /public/images/uniformes/titular-medias-espalda.jpg
 *   /public/images/uniformes/alternativa-camiseta-frente.jpg
 *   ... (mismo patrón para "alternativa")
 * Formatos aceptados: .jpg, .png o .webp (se prueban en ese orden).
 * Si no existe la foto, se muestra un placeholder elegante automáticamente.
 */

const KITS = [
  {
    id: "titular",
    nombre: "Kit Titular",
    badge: "Titular",
    badgeClass: "bg-cyan-500/20 border-cyan-400 text-cyan-300",
    jersey: "#00A2E8",
    trim: "#FFF200",
    msg: "Hola, deseo información sobre tallas del Kit Titular Lucmar",
  },
  {
    id: "alternativa",
    nombre: "Kit Alternativo",
    badge: "Alternativo",
    badgeClass: "bg-gold/20 border-gold text-gold",
    jersey: "#FFFFFF",
    trim: "#00FF00",
    msg: "Hola, deseo información sobre tallas del Kit Alternativo Lucmar",
  },
];

const PRENDAS = [
  { id: "camiseta", nombre: "Camiseta", icon: "👕" },
  { id: "short", nombre: "Short", icon: "🩳" },
  { id: "medias", nombre: "Medias", icon: "🧦" },
];

const VISTAS = [
  { id: "frente", nombre: "Frente" },
  { id: "espalda", nombre: "Espalda" },
];

function candidates(kitId, prendaId, vistaId) {
  const base = `/images/uniformes/${kitId}-${prendaId}-${vistaId}`;
  // Orden de intento: .png (ideal sin fondo) → .jpg → .webp
  return [`${base}.png`, `${base}.jpg`, `${base}.webp`];
}

/** Placeholder elegante cuando aún no hay foto real cargada. */
function PlaceholderPrenda({ jersey, trim, prenda, vista, kitNombre }) {
  if (prenda === "camiseta") {
    return (
      <svg viewBox="0 0 300 400" className="w-full h-auto" role="img" aria-label={`${kitNombre} ${vista}`}>
        <path
          d="M150 20 C80 20 30 70 30 140 L30 350 L270 350 L270 140 C270 70 220 20 150 20 Z"
          fill={jersey} stroke={trim} strokeWidth="2"
        />
        <path d="M110 80 Q150 60 190 80" fill="none" stroke={trim} strokeWidth="3" />
        <rect x="90" y="100" width="120" height="8" fill={trim} rx="2" />
        <rect x="85" y="130" width="130" height="6" fill={trim} rx="2" />
        <rect x="80" y="160" width="140" height="8" fill={trim} rx="2" />
        {vista === "espalda" ? (
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
  const label = prenda === "short" ? "SHORT" : "MEDIAS";
  return (
    <svg viewBox="0 0 300 220" className="w-full h-auto" role="img" aria-label={`${kitNombre} ${prenda} ${vista}`}>
      {prenda === "short" ? (
        <path d="M90 20 H210 L240 200 H165 L150 120 L135 200 H60 Z" fill={jersey} stroke={trim} strokeWidth="2" />
      ) : (
        <>
          <rect x="70" y="20" width="55" height="180" rx="14" fill={jersey} stroke={trim} strokeWidth="2" />
          <rect x="175" y="20" width="55" height="180" rx="14" fill={jersey} stroke={trim} strokeWidth="2" />
        </>
      )}
      <text x="150" y="205" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="15" fontWeight="700" fill={trim}>
        {vista === "espalda" ? `${label} · ATRÁS` : `${label} · LUCMAR`}
      </text>
    </svg>
  );
}

function VisorPrenda({ kit, prendaId, vistaId }) {
  const [sinFoto, setSinFoto] = useState(false);
  const prenda = PRENDAS.find((p) => p.id === prendaId);
  const urls = candidates(kit.id, prendaId, vistaId);

  return (
    <div className="mx-auto w-full max-w-[300px]">
      {/* Contenedor fijo 3:4: las fotos reales (con o sin fondo) se adaptan sin deformarse */}
      <div className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-xl bg-black/20">
      {!sinFoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={urls.join("|")}
          src={urls[0]}
          alt={`${kit.nombre} · ${prenda.nombre} · ${vistaId === "frente" ? "frente" : "espalda"}`}
          loading="lazy"
          data-ext-index="0"
          onError={(e) => {
            const i = Number(e.currentTarget.dataset.extIndex || 0);
            if (i < urls.length - 1) {
              e.currentTarget.dataset.extIndex = String(i + 1);
              e.currentTarget.src = urls[i + 1];
            } else {
              setSinFoto(true);
            }
          }}
          className="kit-view-enter h-full w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        />
      ) : (
        <div key={`${prendaId}-${vistaId}`} className="kit-view-enter h-full w-full p-4">
          <PlaceholderPrenda
            jersey={kit.jersey}
            trim={kit.trim}
            prenda={prendaId}
            vista={vistaId}
            kitNombre={kit.nombre}
          />
        </div>
      )}
      </div>
      {sinFoto && (
        <p className="mt-3 text-center text-xs text-emerald-50/50">
          Vista ilustrativa · sube la foto real a <code className="text-gold">/images/uniformes/{kit.id}-{prendaId}-{vistaId}.png</code>
        </p>
      )}
    </div>
  );
}

export default function Uniformes() {
  const [kitId, setKitId] = useState("titular");
  const [prendaId, setPrendaId] = useState("camiseta");
  const [vistaId, setVistaId] = useState("frente");

  const kit = KITS.find((k) => k.id === kitId);

  const kitTab = (active) =>
    `flex-1 rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
      active ? "bg-[#FFF200] text-[#070D1E]" : "text-emerald-50/70 hover:text-white"
    }`;
  const subTab = (active, accent) =>
    `flex-1 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
      active ? accent : "text-emerald-50/70 hover:text-white"
    }`;

  return (
    <section id="uniforme" className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-10">
          <span className="inline-block rounded-full bg-neon/10 border border-neon/30 px-4 py-1 text-sm font-semibold text-neon mb-4">
            👕 Equipamiento
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-center">Indumentaria Oficial Lucmar</h2>
          <p className="mt-4 max-w-2xl mx-auto text-emerald-50/70">
            Diseñada para el alto rendimiento y comodidad de nuestros alumnos en cada entrenamiento y partido.
          </p>
        </header>

        <Tilt className="glass rounded-2xl p-6 sm:p-8">
          {/* Selector superior de kit */}
          <div className="flex gap-2 rounded-lg bg-black/30 p-1" role="tablist" aria-label="Seleccionar kit">
            {KITS.map((k) => (
              <button
                key={k.id}
                role="tab"
                aria-selected={kitId === k.id}
                onClick={() => setKitId(k.id)}
                className={kitTab(kitId === k.id)}
              >
                Kit {k.badge}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${kit.badgeClass}`}>
              {kit.badge}
            </span>
            <h3 className="font-display text-xl">{kit.nombre}</h3>
          </div>

          {/* Selector de prenda */}
          <div className="mt-4 flex gap-2 rounded-lg bg-black/30 p-1" role="tablist" aria-label="Seleccionar prenda">
            {PRENDAS.map((p) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={prendaId === p.id}
                onClick={() => setPrendaId(p.id)}
                className={subTab(
                  prendaId === p.id,
                  kitId === "titular"
                    ? "bg-cyan-500/25 text-cyan-200"
                    : "bg-[#00FF00]/20 text-[#00FF00]"
                )}
              >
                {p.icon} {p.nombre}
              </button>
            ))}
          </div>

          {/* Conmutador frente / espalda */}
          <div className="mt-3 flex gap-2 rounded-lg bg-black/30 p-1" role="tablist" aria-label="Vista frente o espalda">
            {VISTAS.map((v) => (
              <button
                key={v.id}
                role="tab"
                aria-selected={vistaId === v.id}
                onClick={() => setVistaId(v.id)}
                className={subTab(vistaId === v.id, "bg-[#FFF200] text-[#070D1E]")}
              >
                {v.nombre}
              </button>
            ))}
          </div>

          {/* Visor */}
          <div className="mt-6 min-h-[300px]" key={`${kitId}-${prendaId}-${vistaId}`}>
            <VisorPrenda kit={kit} prendaId={prendaId} vistaId={vistaId} />
          </div>

          <a
            href={wa(kit.msg)}
            target="_blank" rel="noopener noreferrer"
            className="mt-6 block w-full rounded-full border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm font-semibold text-gold hover:bg-gold hover:text-night transition-colors text-center"
          >
            Consultar Tallas Disponibles por WhatsApp
          </a>
        </Tilt>
      </div>
    </section>
  );
}

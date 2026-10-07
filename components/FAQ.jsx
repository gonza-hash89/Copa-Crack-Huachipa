"use client";
import { useState } from "react";
import { wa } from "./Hero";

const ITEMS = [
  {
    q: "¿Qué edades aceptan en la escuela?",
    a: "Recibimos niños y jóvenes de 4 a 13 años, divididos en 3 categorías: Iniciación (4-6 años), Formación (7-10 años) y Competencia Infantil (11-13 años). Cada grupo entrena con una metodología adaptada a su etapa de desarrollo.",
  },
  {
    q: "¿Cuáles son los horarios de entrenamiento?",
    a: "Entrenamos los martes y jueves de 5:30 PM a 7:00 PM. Todas las categorías trabajan en simultáneo en la cancha, cada una con su comando técnico dedicado.",
  },
  {
    q: "¿Dónde está ubicada la sede?",
    a: "Nuestra sede es el Complejo Deportivo “Parque Industrial” en Huachipa (Lurigancho-Chosica), Plus Code 2372+44Q. Contamos con cancha reglamentaria e infraestructura de primer nivel.",
  },
  {
    q: "¿Puedo solicitar una clase de prueba?",
    a: "¡Claro que sí! La primera clase de prueba es totalmente gratis y sin compromiso. Solo completa el formulario de contacto o escríbenos por WhatsApp al +51 944 897 167 y coordinamos tu visita.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-10">
          <span className="inline-block rounded-full bg-neon/10 border border-neon/30 px-4 py-1 text-sm font-semibold text-neon mb-4">
            ❓ Preguntas frecuentes
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-center">¿Tienes dudas?</h2>
          <p className="mt-4 text-emerald-50/70">
            Respondemos lo que más nos preguntan los padres antes de matricular.
          </p>
        </header>

        <div className="space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`glass rounded-2xl overflow-hidden transition-colors ${
                  isOpen ? "border-[#00FF00]/60 shadow-[0_0_28px_rgba(0,255,0,0.2)]" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className={`flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-300 ${
                      isOpen ? "rotate-45 border-[#00FF00] text-[#00FF00]" : "border-white/20 text-gold"
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-relaxed text-emerald-50/80">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a
            href={wa("Hola, tengo una consulta sobre la Escuela Lucmar Huachipa.")}
            target="_blank" rel="noopener noreferrer"
            className="inline-block rounded-full border border-gold/40 bg-gold/10 px-6 py-2.5 text-sm font-semibold text-gold hover:bg-gold hover:text-night transition-colors"
          >
            ¿Otra duda? Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

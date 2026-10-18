"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51999999999";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#fixture", label: "Fixture" },
  { href: "#equipos", label: "Equipos" },
  { href: "#posiciones", label: "Posiciones" },
  { href: "#historial", label: "Historial" },
  { href: "#galeria", label: "Galería" },
  { href: "#inscripcion", label: "Inscripción" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 20);
    }, { passive: true });
  }

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero información sobre la Copa Crack Perú.")}`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-3" : "bg-transparent py-4"
      }`}
      role="banner"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex items-center justify-between">
          <Link href="#inicio" className="flex items-center gap-3" aria-label="Copa Crack Perú - Inicio">
            <Logo size={48} />
            <span className="hidden sm:block font-display text-xl text-neon-yellow">Copa Crack Perú</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
<Link
  key={link.href}
  href={link.href}
  className="text-sm font-medium text-white-dim hover:text-neon-yellow transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-neon-yellow after:transition-all hover:after:w-full"
>
  {link.label}
</Link>
            ))}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp hidden sm:inline-flex"
              aria-label="Contactar por WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" />
              </svg>
              <span>Contacto</span>
            </a>
          </div>

<button
  className="md:hidden p-2 rounded-xl glass text-neon-yellow hover:bg-neon-yellow/10 transition-colors"
  onClick={() => setMobileOpen(!mobileOpen)}
  aria-expanded={mobileOpen}
  aria-controls="mobile-menu"
  aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
>
{mobileOpen ? (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFEB00" strokeWidth="2" aria-hidden="true" className="drop-shadow-[0_0_4px_rgba(255,235,0,0.6)]">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
) : (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFEB00" strokeWidth="2" aria-hidden="true" className="drop-shadow-[0_0_4px_rgba(255,235,0,0.6)]">
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
)}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
          role="navigation"
          aria-label="Menú móvil"
        >
          <div className="glass-strong rounded-2xl p-4 space-y-2">
            {navLinks.map((link) => (
<Link
  key={link.href}
  href={link.href}
  className="block px-4 py-3 rounded-xl text-base font-medium text-white-dim hover:text-neon-yellow hover:bg-neon-yellow/5 transition-colors"
  onClick={() => setMobileOpen(false)}
>
  {link.label}
</Link>
            ))}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center mt-2"
              onClick={() => setMobileOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" />
              </svg>
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
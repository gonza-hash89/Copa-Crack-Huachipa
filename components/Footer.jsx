"use client";

import Link from "next/link";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51999999999";

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/copacrackperu", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  )},
  { name: "Instagram", href: "https://instagram.com/copacrackperu", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  )},
  { name: "TikTok", href: "https://tiktok.com/@copacrackperu", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.13.44-.72.74-1.15.51-1.27-.66-2.7-.76-4.12-.24-.24.09-.45.14-.66.14-.53 0-.96-.41-.96-.96 0-.4.34-.7.76-.63 1.5.24 4.14.75 4.66-1.94.05-.28-.22-.5-.5-.42zm-1.52-3.87c-.54-.32-1.3-.56-2.2-.48-.21.02-.4.08-.58.17-.6.31-.98.97-.98 1.72 0 1.05.95 1.84 2.04 1.72.58-.05 1.11-.37 1.33-.94.24-.62.08-1.33-.4-1.75-.12-.1-.28-.15-.44-.15-.37 0-.66.35-.63.71.02.37.34.66.7.66.24 0 .43-.08.6-.22.26-.22.33-.6.17-.96zM8.06 12.3c-.26 1.76 2.33 3.08 4.44 2.59.42-.1 1.06-.35 1.06-.77 0-.57-.66-.92-1.21-.73-1.72.6-2.97-.4-3.28-2.06-.06-.34.25-.62.57-.62.48 0 .86.38.86.86 0 .29-.17.56-.44.7-.75.37-1.2 1.2-1.2 2.12 0 .54.25 1 .67 1.29.2.14.44.18.68.1.17-.05.34-.14.48-.3.44-.51.22-1.37-.48-1.78z"/></svg>
  )},
  { name: "YouTube", href: "https://youtube.com/@copacrackperu", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  )},
];

export default function Footer() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero información sobre la Copa Crack Perú.")}`;

  return (
    <footer className="relative px-4 pt-16 pb-10" role="contentinfo">
      <div className="absolute inset-0 grass-field tables opacity-30" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="glass-strong rounded-2xl p-6 sport-card">
            <div className="flex items-center gap-3 mb-4">
              <svg width="48" height="48" viewBox="0 0 90 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M45 5 L85 20 V80 C85 92 68 98 45 98 C22 98 5 92 5 80 V20 Z" fill="#050202" stroke="#FFEB00" strokeWidth="3" filter="drop-shadow(0 0 8px #FFEB00)" />
<text x="45" y="55" textAnchor="middle" fontFamily="Bebas Neue, Impact, sans-serif" fontSize="28" fill="#FFEB00" fontWeight="bold" letterSpacing="2" filter="drop-shadow(0 0 6px #FFEB00)">CCP</text>
              </svg>
              <div>
                <h3 className="font-display text-xl text-neon-yellow">Copa Crack Perú</h3>
                <p className="text-xs text-white-dim">Torneo de Fútbol Formativo</p>
              </div>
            </div>
            <p className="text-sm text-white-dim mb-4">
              El torneo de fútbol formativo más importante de Huachipa. Categorías Sub-08, Sub-10 y Sub-12.
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white-dim hover:text-neon-yellow hover:border-neon-yellow/50 transition-colors border border-white/10"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-6 sport-card">
            <h4 className="font-display text-lg text-gold mb-4">Ubicación</h4>
            <address className="text-sm text-white-dim not-italic space-y-3">
              <div className="flex items-start gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFEB00" strokeWidth="2" className="flex-shrink-0 mt-0.5 drop-shadow-[0_0_4px_rgba(255,235,0,0.5)]" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Complejo Deportivo Cerro Camote<br />Huachipa, Lurigancho-Chosica, Lima</span>
              </div>
              <div className="flex items-start gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8c547" strokeWidth="2" className="flex-shrink-0 mt-0.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-neon-yellow transition-colors text-phosphor-red">+51 999 999 999</a>
              </div>
              <div className="flex items-start gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8c547" strokeWidth="2" className="flex-shrink-0 mt-0.5" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:info@copacrackperu.com" className="hover:text-neon-yellow transition-colors text-phosphor-red">info@copacrackperu.com</a>
              </div>
            </address>
          </div>

          <div className="glass-strong rounded-2xl p-6 sport-card">
            <h4 className="font-display text-lg text-gold mb-4">Enlaces Rápidos</h4>
            <nav aria-label="Enlaces del pie de página">
              <ul className="space-y-2">
                {[
                  { href: "#inicio", label: "Inicio" },
                  { href: "#fixture", label: "Fixture" },
                  { href: "#equipos", label: "Equipos" },
                  { href: "#posiciones", label: "Tabla de Posiciones" },
                  { href: "#historial", label: "Historial de Campeones" },
                  { href: "#galeria", label: "Galería de Fotos" },
                  { href: "#inscripcion", label: "Inscripción" },
                  { href: "#patrocinadores", label: "Patrocinadores" },
                ].map((link) => (
                  <li key={link.href}>
<Link href={link.href} className="text-sm text-white-dim hover:text-neon-yellow transition-colors flex items-center gap-2 group">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFEB00" strokeWidth="2" className="transform group-hover:translate-x-1 transition-transform drop-shadow-[0_0_4px_rgba(255,235,0,0.5)]" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
  {link.label}
</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-neon-yellow/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center justify-center sm:justify-start gap-4 flex-wrap">
<Link href="/privacidad" className="text-xs text-white-dim hover:text-neon-yellow transition-colors">Política de Privacidad</Link>
<span className="text-white/20">·</span>
<Link href="/terminos" className="text-xs text-white-dim hover:text-neon-yellow transition-colors">Términos y Condiciones</Link>
<span className="text-white/20">·</span>
<Link href="/reclamaciones" className="text-xs text-white-dim hover:text-neon-yellow transition-colors">Libro de Reclamaciones</Link>
            </div>
            <p className="text-xs text-white/50 text-center sm:text-right">
              © {new Date().getFullYear()} Copa Crack Perú. Todos los derechos reservados.
            </p>
            <p className="text-[11px] text-white/40 text-center sm:text-right">
              Protección de datos según Ley N° 29733 · Desarrollado para el fútbol formativo peruano
            </p>
          </div>
        </div>
      </div>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        className="fab-whatsapp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" />
        </svg>
      </a>
    </footer>
  );
}
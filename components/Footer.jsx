import { wa } from "./Hero";

const socials = [
  { name: "Facebook", url: "https://www.facebook.com/share/19wQasuk9H/", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  )},
  { name: "Instagram", url: "https://www.instagram.com/escuela_de_futbol_lucmar", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  )},
  { name: "TikTok", url: "https://www.tiktok.com/@escueladefutbollucmar", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5"><path d="M12 0C5.374 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.13.44-.72.74-1.15.51-1.27-.66-2.7-.76-4.12-.24-.24.09-.45.14-.66.14-.53 0-.96-.41-.96-.96 0-.4.34-.7.76-.63 1.5.24 4.14.75 4.66-1.94.05-.28-.22-.5-.5-.42zm-1.52-3.87c-.54-.32-1.3-.56-2.2-.48-.21.02-.4.08-.58.17-.6.31-.98.97-.98 1.72 0 1.05.95 1.84 2.04 1.72.58-.05 1.11-.37 1.33-.94.24-.62.08-1.33-.4-1.75-.12-.1-.28-.15-.44-.15-.37 0-.66.35-.63.71.02.37.34.66.7.66.24 0 .43-.08.6-.22.26-.22.33-.6.17-.96zM8.06 12.3c-.26 1.76 2.33 3.08 4.44 2.59.42-.1 1.06-.35 1.06-.77 0-.57-.66-.92-1.21-.73-1.72.6-2.97-.4-3.28-2.06-.06-.34.25-.62.57-.62.48 0 .86.38.86.86 0 .29-.17.56-.44.7-.75.37-1.2 1.2-1.2 2.12 0 .54.25 1 .67 1.29.2.14.44.18.68.1.17-.05.34-.14.48-.3.44-.51.22-1.37-.48-1.78z"/></svg>
  )},
];

export default function Footer() {
  return (
    <footer id="contacto" className="px-4 pt-24 pb-10 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-72 h-72 border-l-[200px] border-b-[200px] border-l-transparent border-b-gold/5 rotate-45" />
      </div>
      
      <div className="relative mx-auto max-w-3xl glass clip-path-polygon\(0_4px_4px_0_100%_0_100%_calc\(100%-4px\)_calc\(100%-4px\)_100%_0_100%\) p-6 text-center">
        <h2 className="font-display text-3xl text-gradient-gold mb-4">Contacto</h2>
        <p className="text-white/80 mb-2">WhatsApp: +51 944 897 167</p>
        <p className="text-white/80 mb-2">Correo: contacto@copacrack.pe</p>
        <p className="text-white/80 mb-6">Huachipa, Lima, Perú</p>
        <div className="flex justify-center gap-4 text-sm">
          {socials.map(({ name, url, icon }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-gold hover:border-gold/50 hover:bg-gold/10 transition-all duration-300 border border-white/10 group" aria-label={name}>
              {icon}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-white/40 tracking-wide">© {new Date().getFullYear()} Copa Crack. Todos los derechos reservados.</p>
      <a href={wa("Hola, quiero información sobre la Copa Crack.")} target="_blank" rel="noopener noreferrer"
         aria-label="Escribir por WhatsApp"
         className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center clip-path-polygon\(0_4px_4px_0_100%_0_100%_calc\(100%-4px\)_calc\(100%-4px\)_100%_0_100%\) bg-gradient-to-br from-red to-gold shadow-[6px_6px_0_rgba(255,190,11,0.6),_12px_12px_0_rgba(255,30,39,0.3)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_rgba(255,190,11,0.8),_16px_16px_0_rgba(255,30,39,0.4)] transition-all duration-150">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#0d0505" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c-.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" />
        </svg>
      </a>
    </footer>
  );
}
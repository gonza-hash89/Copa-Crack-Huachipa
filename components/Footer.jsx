import { wa } from "./Hero";

const socials = [
  { name: "Facebook", url: "https://www.facebook.com/share/19wQasuk9H/", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  )},
  { name: "Instagram", url: "https://www.instagram.com/escuela_de_futbol_lucmar", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  )},
  { name: "TikTok", url: "https://www.tiktok.com/@escueladefutbollucmar", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5"><path d="M22.56,16.05c0,1.76-1.11,3.45-2.96,3.69c-.12,.02-.46.08-.79.08c-.34,0-.63-.05-.89-.14c-2.25-.81-4.8-1.48-7.37-1.48c-2.57,0-5.12,.67-7.37,1.48c-.27,.09-.57,.14-.89,.14c-.33,0-.67-.06-.79-.08c-1.85-.24-3.69-1.97-2.96-3.69c.12-.27,.15-.83-.07-1.1C.96,4.67,2.43,3.33,4.41,3.33c.14,0,.28,0,.42,0c2.78,0,5.37,1.16,7.37,3.28c-.38-.1-.78-.14-1.15-.14c-.52,0-1.03,.09-1.52,.28c-.6,.24-1.08,.65-1.42,1.21c-.38,.63-.56,1.41-.56,2.28c0,.38,.02,.75,.07,1.12c-.04-.18-.07-.36-.07-1.12c0-.88,.18-1.66,.56-2.28c.34-.56,.82-1.04,1.42-1.21c.49-.19,1.01-.28,1.52-.28c.32,0,.67,.04,1.02,.14c1.88-2.3,4.48-3.28,7.37-3.28c.14,0,.28,0,.42,0c2.57,0,4.8,1.17,6.26,3.3C23.04,3.59,24,4.54,24,5.43C24,6.44,23.88,6.79,23.73,6.84L22.56,16.05z"/></svg>
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
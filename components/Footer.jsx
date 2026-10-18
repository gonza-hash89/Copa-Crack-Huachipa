import { wa } from "./Hero";

const socials = [
  ["Facebook", "https://facebook.com/copacrack"],
  ["Instagram", "https://instagram.com/copacrack"],
  ["TikTok", "https://tiktok.com/@copacrack"],
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
          {socials.map(([n, u]) => (
            <a key={n} href={u} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-red transition-colors font-bold uppercase tracking-wide">{n}</a>
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
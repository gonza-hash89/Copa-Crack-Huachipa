import Link from "next/link";
import { wa } from "./Hero";

const socials = [
  ["Facebook", "https://facebook.com/lucmarhuachipa"],
  ["Instagram", "https://instagram.com/lucmarhuachipa"],
  ["TikTok", "https://tiktok.com/@lucmarhuachipa"],
];

export default function Footer() {
  return (
    <footer className="px-4 pt-16 pb-10">
      <div className="mx-auto max-w-3xl glass rounded-2xl p-6 text-center">
        <h2 className="font-display text-3xl">Contacto</h2>
        <p className="mt-3 text-emerald-50/80">WhatsApp: +51 944 897 167</p>
        <p className="text-emerald-50/80">Correo: contacto@lucmarhuachipa.pe</p>
        <p className="text-emerald-50/80">Huachipa, Lima, Perú</p>
        <div className="mt-4 flex justify-center gap-4 text-sm">
          {socials.map(([n, u]) => (
            <a key={n} href={u} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-neon">{n}</a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-3xl">
        <div className="glass rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <Link
            href="/reclamaciones"
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold hover:text-night transition-colors"
          >
            <span aria-hidden="true" className="text-base">📕</span>
            Libro de Reclamaciones Virtual
          </Link>
          <span className="hidden sm:inline text-emerald-50/30" aria-hidden="true">·</span>
          <Link href="/privacidad" className="text-xs text-emerald-50/70 hover:text-gold underline">
            Política de Privacidad
          </Link>
        </div>
        <p className="mt-4 text-center text-xs text-emerald-50/50">
          © {new Date().getFullYear()} Escuela de Fútbol Lucmar de Huachipa. Todos los derechos reservados.
        </p>
        <p className="mt-1 text-center text-[11px] text-emerald-50/40">
          Protección de datos según Ley N° 29733 · Reclamos según normativa INDECOPI
        </p>
      </div>

      <a href={wa("Hola, quiero información sobre las inscripciones en la Escuela Lucmar Huachipa.")} target="_blank" rel="noopener noreferrer"
         aria-label="Escribir por WhatsApp"
         className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-[0_0_24px_rgba(37,211,102,.6)] hover:scale-105 transition-transform">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" />
        </svg>
      </a>
    </footer>
  );
}

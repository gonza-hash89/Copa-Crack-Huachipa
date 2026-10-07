import Logo from "./Logo";
import Tilt from "./Tilt";

export const WHATSAPP = "51944897167";
export const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export default function Hero() {
  return (
    <section id="inicio" className="pt-40 sm:pt-32 pb-20 px-4">
      <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
        <Logo size={150} />
        <h1 className="font-display text-6xl sm:text-8xl mt-6">
          <span className="metallic-shine" data-text="LUCMAR HUACHIPA">LUCMAR HUACHIPA</span>
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-emerald-50/90">Escuela de Fútbol - Formación Integral</p>
        <p className="mt-4 max-w-xl text-emerald-50/70">
          Desarrollo técnico, táctico, físico y valores para niños y jóvenes de 4 a 13 años.
          Metodología profesional adaptada a cada etapa formativa.
        </p>
        <a
          href={wa("Hola, quiero información sobre las inscripciones en la Escuela Lucmar Huachipa.")}
          target="_blank" rel="noopener noreferrer"
          className="btn-pulse-neon mt-8 rounded-full bg-[#FFF200] px-8 py-3 font-extrabold uppercase tracking-wide text-[#070D1E] transition-transform hover:-translate-y-1"
        >
          Matricularme ya
        </a>
        <div className="mt-10 grid grid-cols-2 gap-4 w-full max-w-xl">
          <Tilt className="glass rounded-2xl p-5 text-center">
            <span className="font-display text-4xl text-gold">1</span>
            <span className="block mt-1 text-sm font-medium">Sede disponible</span>
            <span className="block text-xs text-neon font-semibold uppercase tracking-wider mt-1">Parque Industrial</span>
          </Tilt>
          <Tilt className="glass rounded-2xl p-5 text-center">
            <span className="font-display text-4xl text-gold">12</span>
            <span className="block mt-1 text-sm font-medium">Años de experiencia</span>
            <span className="block text-xs text-neon font-semibold uppercase tracking-wider mt-1">Formando campeones</span>
          </Tilt>
        </div>
      </div>
    </section>
  );
}

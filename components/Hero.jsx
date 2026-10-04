import Logo from "./Logo";

export const WHATSAPP = "51944897167";
export const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export default function Hero() {
  return (
    <section id="inicio" className="pt-40 sm:pt-32 pb-20 px-4">
      <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
        <Logo size={150} />
        <h1 className="font-display text-6xl sm:text-8xl mt-6 bg-gradient-to-r from-gold via-yellow-200 to-neon bg-clip-text text-transparent">
          LUCMAR HUACHIPA
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-emerald-50/90">Escuela de Fútbol - Formación Integral</p>
        <p className="mt-4 max-w-xl text-emerald-50/70">
          Desarrollo técnico, táctico, físico y valores para niños y jóvenes de 4 a 13 años. 
          Metodología profesional adaptada a cada etapa formativa.
        </p>
        <a
          href={wa("Hola, quiero información sobre las inscripciones en la Escuela Lucmar Huachipa.")}
          target="_blank" rel="noopener noreferrer"
          className="mt-8 rounded-full bg-neon px-8 py-3 font-semibold text-night shadow-[0_0_30px_rgba(16,185,129,.5)] hover:bg-gold hover:shadow-[0_0_30px_rgba(245,158,11,.5)] transition-colors"
        >
          Matricularme ya
        </a>
      </div>
    </section>
  );
}

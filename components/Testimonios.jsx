import Tilt from "./Tilt";

const REVIEWS = [
  {
    name: "María Torres",
    role: "Mamá de Thiago · 7 años (Formación)",
    text: "Thiago entró tímido y sin saber recepcionar. En tres meses mejoró su pase, su confianza y hasta sus notas. Los profesores tratan a cada niño por su nombre.",
  },
  {
    name: "Jorge Quispe",
    role: "Papá de Matías · 11 años (Competencia)",
    text: "Lo que más valoro es la formación integral: disciplina, respeto y trabajo en equipo. El comando técnico es exigente pero muy humano con los chicos.",
  },
  {
    name: "Rosa Mendoza",
    role: "Mamá de Dylan · 5 años (Iniciación)",
    text: "Mi hijo ama los martes y jueves. Aprende jugando, hace amigos y llega feliz a casa. La clase de prueba nos convenció desde el primer día.",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-[#FFF200]" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">★</span>
      ))}
    </div>
  );
}

export default function Testimonios() {
  return (
    <section id="testimonios" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="text-center mb-10">
          <span className="inline-block rounded-full bg-neon/10 border border-neon/30 px-4 py-1 text-sm font-semibold text-neon mb-4">
            💬 Testimonios
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-center">Lo que dicen los padres</h2>
          <p className="mt-4 max-w-2xl mx-auto text-emerald-50/70">
            La confianza se gana en la cancha: formación integral dentro y fuera del campo.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <Tilt key={r.name} className="glass rounded-2xl p-6 flex flex-col">
              <span className="font-display text-5xl text-[#00FF00]/40 leading-none" aria-hidden="true">“</span>
              <Stars />
              <p className="mt-3 text-sm leading-relaxed text-emerald-50/85 flex-1">{r.text}</p>
              <div className="mt-5 pt-4 border-t border-white/10">
                <p className="font-semibold">{r.name}</p>
                <p className="text-xs text-emerald-50/60">{r.role}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

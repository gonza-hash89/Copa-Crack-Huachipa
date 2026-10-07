import Tilt from "./Tilt";

export default function Categorias() {
  const categorias = [
    {
      id: 1,
      nombre: "Iniciación",
      edad: "4 - 6 años",
      icon: "🌱",
      descripcion: "Primeros pasos en el fútbol mediante el juego y la exploración motriz.",
      detalles: [
        "Psicomotricidad y coordinación básica",
        "Juegos recreativos con balón",
        "Primer contacto y familiarización",
        "Desarrollo de lateralidad y equilibrio",
        "Socialización y trabajo en grupo"
      ],
      whatsappMsg: "Hola, deseo información sobre la categoría de Iniciación (4 a 6 años)"
    },
    {
      id: 2,
      nombre: "Formación",
      edad: "7 - 10 años",
      icon: "⚽",
      descripcion: "Consolidación técnica y táctica para el desarrollo del jugador integral.",
      detalles: [
        "Técnica individual: pase, recepción, remate",
        "Fundamentos tácticos defensivos y ofensivos",
        "Trabajo en equipo y comunicación",
        "Desarrollo de habilidades motrices complejas",
        "Introducción a la competición formativa"
      ],
      whatsappMsg: "Hola, deseo información sobre la categoría de Formación (7 a 10 años)"
    },
    {
      id: 3,
      nombre: "Competencia Infantil",
      edad: "11 - 13 años",
      icon: "🏆",
      descripcion: "Preparación avanzada para torneos y alto rendimiento formativo.",
      detalles: [
        "Táctica aplicada y sistemas de juego",
        "Rendimiento físico y prevención de lesiones",
        "Preparación para torneos inter-academias",
        "Mentalidad competitiva y liderazgo",
        "Análisis de vídeo y toma de decisiones"
      ],
      whatsappMsg: "Hola, deseo información sobre la categoría de Competencia Infantil (11 a 13 años)"
    }
  ];

  const WHATSAPP = "51944897167";
  const wa = (msg) => `https://wa.me/51944897167?text=${encodeURIComponent(msg)}`;

  return (
    <section id="categorias" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="text-center mb-12">
          <span className="inline-block rounded-full bg-neon/10 border border-neon/30 px-4 py-1 text-sm font-semibold text-neon mb-4">
            ⚽ Categorías por Edad
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-center">Nuestras Categorías de Formación</h2>
          <p className="mt-4 max-w-2xl mx-auto text-emerald-50/70">
            Programas diseñados para el desarrollo deportivo e integral de niños de 4 a 13 años
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorias.map((cat) => (
            <Tilt key={cat.id} className="glass rounded-2xl p-6 flex flex-col hover:border-gold/60">
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="text-5xl" aria-hidden="true">{cat.icon}</span>
                <span className="flex-shrink-0 rounded-full bg-neon/10 border border-neon/30 px-3 py-1 text-xs font-bold text-neon">
                  {cat.edad}
                </span>
              </div>
              <h3 className="font-display text-2xl text-center mb-2">{cat.nombre}</h3>
              <p className="text-emerald-50/70 text-center mb-4 text-sm">{cat.descripcion}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {cat.detalles.map((detalle, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-emerald-50/70">
                    <span className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-neon" aria-hidden="true" />
                    <span>{detalle}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/51944897167?text=${encodeURIComponent(cat.whatsappMsg)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full rounded-full bg-gold/10 border border-gold/40 px-4 py-2 text-sm font-semibold text-gold hover:bg-gold hover:text-night transition-colors text-center"
              >
                Consultar Horarios
              </a>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
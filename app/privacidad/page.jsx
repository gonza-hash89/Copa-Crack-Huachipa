export const metadata = {
  title: "Política de Privacidad | Escuela de Fútbol Lucmar de Huachipa",
  description:
    "Política de Privacidad de la Escuela de Fútbol Lucmar de Huachipa según la Ley N° 29733 de Protección de Datos Personales del Perú.",
};

const WHATSAPP_URL =
  "https://wa.me/51944897167?text=" +
  encodeURIComponent("Hola, quiero ejercer mis derechos ARCO sobre mis datos personales.");

export default function Privacidad() {
  return (
    <section className="px-4 pt-32 pb-20">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-10">
          <span className="inline-block rounded-full bg-neon/10 border border-neon/30 px-4 py-1 text-sm font-semibold text-neon mb-4">
            🔒 Privacidad y datos
          </span>
          <h1 className="font-display text-4xl sm:text-5xl">Política de Privacidad</h1>
          <p className="mt-4 text-emerald-50/70">
            Escuela de Fútbol Lucmar de Huachipa · Huachipa, Lima, Perú
          </p>
        </header>

        <div className="glass rounded-2xl p-6 sm:p-8 space-y-8 text-sm leading-relaxed text-emerald-50/85">
          <div>
            <h2 className="font-display text-xl text-gold mb-2">1. Marco legal</h2>
            <p>
              Tratamos tus datos personales conforme a la <strong>Ley N° 29733, Ley de Protección
              de Datos Personales</strong>, y su Reglamento (D.S. N° 003-2013-JUS). Al usar nuestros
              formularios aceptas esta política de forma libre, previa, expresa e informada.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-gold mb-2">2. Datos que recopilamos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nombre del padre, madre o apoderado.</li>
              <li>Nombre y edad del alumno.</li>
              <li>Número de teléfono de contacto.</li>
              <li>Categoría de interés e historial de mensajes por WhatsApp.</li>
              <li>Opiniones y puntuaciones que decides publicar (previa moderación).</li>
            </ul>
            <p className="mt-2">No solicitamos datos bancarios ni contraseñas por ningún canal.</p>
          </div>

          <div>
            <h2 className="font-display text-xl text-gold mb-2">3. Finalidad del tratamiento</h2>
            <p>
              Tus datos se usan <strong>exclusivamente</strong> para coordinar matrículas,
              clases de prueba y brindar información sobre entrenamientos, horarios, categorías
              y torneos de la escuela. No vendemos ni cedemos tus datos a terceros con fines
              publicitarios.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-gold mb-2">4. Protección de menores de edad</h2>
            <p>
              Declaramos expresamente que <strong>los datos personales pertenecen a los padres
              o tutores legales</strong>. No recabamos información directamente de menores de
              edad: toda comunicación, matrícula y autorización es realizada por el apoderado.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-gold mb-2">5. Conservación y seguridad</h2>
            <p>
              Conservamos tus datos solo el tiempo necesario para la finalidad descrita y
              aplicamos medidas de seguridad razonables (cabeceras HTTP seguras, validación y
              sanitización de entradas, limitación de envíos y moderación previa de contenidos
              públicos). Los mensajes enviados por WhatsApp se rigen además por la política de
              privacidad de WhatsApp/Meta.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-gold mb-2">
              6. Tus derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
            </h2>
            <p>
              Puedes solicitar en cualquier momento el acceso, rectificación, cancelación u
              oposición al tratamiento de tus datos, de forma gratuita, por estos canales:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                WhatsApp:{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank" rel="noopener noreferrer"
                  className="text-gold hover:text-neon underline"
                >
                  +51 944 897 167
                </a>
              </li>
              <li>
                Correo:{" "}
                <a href="mailto:contacto@lucmarhuachipa.pe" className="text-gold hover:text-neon underline">
                  contacto@lucmarhuachipa.pe
                </a>
              </li>
            </ul>
            <p className="mt-2">
              Atenderemos tu solicitud en los plazos previstos por la Ley N° 29733. Si no estás
              conforme con nuestra respuesta, puedes acudir a la Autoridad Nacional de Protección
              de Datos Personales o presentar tu reclamo ante INDECOPI.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-gold mb-2">7. Consentimiento</h2>
            <p>
              Al marcar la casilla “He leído y acepto la Política de Privacidad” en nuestros
              formularios, otorgas tu consentimiento expreso para el tratamiento descrito. Puedes
              retirarlo cuando quieras escribiéndonos por los canales ARCO indicados.
            </p>
          </div>

          <p className="text-xs text-emerald-50/50">
            Última actualización: octubre de 2026.
          </p>
        </div>
      </div>
    </section>
  );
}

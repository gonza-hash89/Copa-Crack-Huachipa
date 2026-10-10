"use client";

/**
 * Límite de errores global de producción.
 * El error completo se registra solo en los logs del servidor;
 * al visitante se le muestra un mensaje genérico (nunca stack traces).
 */
export default function GlobalError({ error, reset }) {
  if (typeof console !== "undefined" && error) {
    // En producción esto va a los logs de Vercel, no al cliente.
    console.error("[global-error]", error?.message || error);
  }

  return (
    <html lang="es">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070D1E",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <p style={{ fontSize: "3rem" }} aria-hidden="true">⚽</p>
          <h1 style={{ fontSize: "1.5rem", margin: "1rem 0" }}>Algo salió mal</h1>
          <p style={{ opacity: 0.7 }}>
            Ocurrió un error inesperado. Por favor, recarga la página o vuelve a intentarlo más tarde.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 2rem",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              fontWeight: 800,
              background: "#FFF200",
              color: "#070D1E",
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}

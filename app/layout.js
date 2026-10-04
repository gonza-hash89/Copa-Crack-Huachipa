import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Escuela de Fútbol Lucmar de Huachipa | Formando Campeones",
  description: "Escuela de Fútbol Lucmar de Huachipa - Formación integral deportiva para niños y jóvenes. Desarrollo técnico, táctico, físico y valores. Inscripciones abiertas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

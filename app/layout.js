import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { analyticsConfig } from "@/lib/analytics";

const SITE_URL = "https://lucmar-huachipa.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Escuela de Fútbol Lucmar de Huachipa | Formando Campeones",
  description:
    "Escuela de Fútbol Lucmar de Huachipa - Formación integral deportiva para niños y jóvenes de 4 a 13 años en Huachipa, Lima. Desarrollo técnico, táctico, físico y valores. Inscripciones abiertas.",
  keywords: [
    "escuela de fútbol Huachipa",
    "academia de fútbol infantil Lima",
    "fútbol niños Lurigancho-Chosica",
    "Copa Crack Perú",
    "Lucmar Huachipa",
  ],
  openGraph: {
    title: "Escuela de Fútbol Lucmar de Huachipa | Formando Campeones",
    description:
      "Formación integral deportiva para niños y jóvenes de 4 a 13 años. Martes y jueves 5:30 PM - 7:00 PM en el Complejo Deportivo Parque Industrial.",
    url: SITE_URL,
    siteName: "Escuela de Fútbol Lucmar de Huachipa",
    locale: "es_PE",
    type: "website",
  },
  robots: { index: true, follow: true },
  ...(analyticsConfig.gsc
    ? { verification: { google: analyticsConfig.gsc } }
    : {}),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Escuela de Fútbol Lucmar de Huachipa",
  alternateName: "Colegio Lucmar",
  description:
    "Escuela de fútbol formativo para niños y jóvenes de 4 a 13 años en Huachipa, Lima.",
  url: SITE_URL,
  telephone: "+51 944 897 167",
  email: "contacto@lucmarhuachipa.pe",
  sport: "Soccer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Complejo Deportivo Parque Industrial, 2372+44Q",
    addressLocality: "Lurigancho-Chosica",
    addressRegion: "Lima",
    postalCode: "15461",
    addressCountry: "PE",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Tuesday", "Thursday"],
    opens: "17:30",
    closes: "19:00",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

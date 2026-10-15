import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { analyticsConfig } from "@/lib/analytics";

const SITE_URL = "https://copa-crack-2d.vercel.app";
const SITE_NAME = "Copa Crack Perú";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51999999999";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Copa Crack Perú | Torneo de Fútbol Formativo en Huachipa",
    template: "%s | Copa Crack Perú",
  },
  description: "Sitio oficial de la Copa Crack Perú. Consulta el fixture, tabla de posiciones, resultados por categorías y fotos del torneo de fútbol formativo en Huachipa y Cerro Camote.",
  keywords: [
    "Copa Crack",
    "Copa Crack Perú",
    "torneo de fútbol formativo",
    "campeonato de fútbol Perú",
    "campeonato Huachipa",
    "copa crack Huachipa",
    "campeonato Cerro Camote",
    "torneo infantil Huachipa",
    "fútbol menor Huachipa",
  ],
  authors: [{ name: "Copa Crack Perú" }],
  creator: "Copa Crack Perú",
  publisher: "Copa Crack Perú",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    title: "Copa Crack Perú | Torneo de Fútbol Formativo en Huachipa",
    description: "Sitio oficial de la Copa Crack Perú. Consulta el fixture, tabla de posiciones, resultados por categorías y fotos del torneo de fútbol formativo en Huachipa y Cerro Camote.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "Escudo Oficial Copa Crack Perú - Torneo de Fútbol Formativo Huachipa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Copa Crack Perú | Torneo de Fútbol Formativo en Huachipa",
    description: "Sitio oficial de la Copa Crack Perú. Consulta el fixture, tabla de posiciones, resultados por categorías y fotos del torneo de fútbol formativo en Huachipa y Cerro Camote.",
    images: [`${SITE_URL}/og-cover.jpg`],
    creator: "@CopaCrackPeru",
  },
  alternates: {
    canonical: SITE_URL,
  },
  ...(analyticsConfig.gsc
    ? { verification: { google: analyticsConfig.gsc } }
    : {}),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SportsEvent",
      "@id": `${SITE_URL}#event`,
      name: "Copa Crack Perú",
      alternateName: "Copa Crack",
      description: "Torneo de fútbol formativo en Huachipa, Lima. Categorías Sub-08, Sub-10, Sub-12. 5ª Edición.",
      url: SITE_URL,
      image: `${SITE_URL}/og-cover.jpg`,
      startDate: "2025-01-15",
      endDate: "2025-12-15",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Complejo Deportivo Cerro Camote",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Cerro Camote",
          addressLocality: "Lurigancho-Chosica",
          addressRegion: "Lima",
          postalCode: "15461",
          addressCountry: "PE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -11.9833,
          longitude: -76.9333,
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Copa Crack Perú",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        telephone: `+${WHATSAPP_NUMBER}`,
        email: "info@copacrackperu.com",
        sameAs: [
          "https://facebook.com/copacrackperu",
          "https://instagram.com/copacrackperu",
          "https://tiktok.com/@copacrackperu",
        ],
      },
      offers: {
        "@type": "Offer",
        name: "Inscripción Equipos",
        description: "Inscribe tu equipo en la Copa Crack Perú vía WhatsApp",
        url: `https://wa.me/${WHATSAPP_NUMBER}`,
        priceCurrency: "PEN",
        availability: "https://schema.org/InStock",
      },
      subEvent: [
        { "@type": "SportsEvent", name: "Copa Crack Perú - Sub-08", description: "Categoría Sub-08 (hasta 8 años)" },
        { "@type": "SportsEvent", name: "Copa Crack Perú - Sub-10", description: "Categoría Sub-10 (hasta 10 años)" },
        { "@type": "SportsEvent", name: "Copa Crack Perú - Sub-12", description: "Categoría Sub-12 (hasta 12 años)" },
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Copa Crack Perú",
      alternateName: "Copa Crack",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/logo.png`,
      description: "Organizador del torneo de fútbol formativo Copa Crack Perú en Huachipa, Lima.",
      telephone: `+${WHATSAPP_NUMBER}`,
      email: "info@copacrackperu.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Cerro Camote",
        addressLocality: "Lurigancho-Chosica",
        addressRegion: "Lima",
        postalCode: "15461",
        addressCountry: "PE",
      },
      sameAs: [
        "https://facebook.com/copacrackperu",
        "https://instagram.com/copacrackperu",
        "https://tiktok.com/@copacrackperu",
      ],
      sport: "Soccer",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: "Sitio oficial de la Copa Crack Perú - Torneo de Fútbol Formativo",
      publisher: { "@id": `${SITE_URL}#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Fixture", item: `${SITE_URL}/#fixture` },
        { "@type": "ListItem", position: 3, name: "Equipos", item: `${SITE_URL}/#equipos` },
        { "@type": "ListItem", position: 4, name: "Posiciones", item: `${SITE_URL}/#posiciones` },
        { "@type": "ListItem", position: 5, name: "Historial", item: `${SITE_URL}/#historial` },
        { "@type": "ListItem", position: 6, name: "Galería", item: `${SITE_URL}/#galeria` },
        { "@type": "ListItem", position: 7, name: "Inscripción", item: `${SITE_URL}/#inscripcion` },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-PE">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#080404" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grass-field">
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
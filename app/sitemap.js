const SITE_URL = "https://lucmar-huachipa.vercel.app";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/reclamaciones`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}

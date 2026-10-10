# Guía de medios: imágenes y video (Core Web Vitals > 90)

## Imágenes
- **Formato:** WebP o AVIF. Next.js convierte automáticamente (`next.config.js` → `images.formats`).
  Si subes `.png`/`.jpg` a `/public`, Next los sirve optimizados igual.
- **Peso objetivo:** menos de **150 KB** por imagen (comprimir en https://squoosh.app).
- **Componente:** usar siempre `next/image` con `loading="lazy"` (excepto el hero/LCP),
  `sizes` acorde al layout y `alt` descriptivo.
- **Remotos permitidos:** solo `images.unsplash.com` (`remotePatterns` en `next.config.js`).
  Para otro CDN, agrégalo ahí antes de usarlo.
- **Uniformes:** `public/images/uniformes/{kit}-{prenda}-{vista}.png|jpg|webp`,
  800×1000 px aprox., fondo neutro o transparente.

## Videos de fondo (cuando se agreguen, ej. Hero)
- **Peso:** menos de **3 MB**; codec **H.264** (`.mp4`), bitrate ~**2.5 Mbps**,
  720p máximo, sin audio (o pista de audio eliminada).
- **Patrón obligatorio:**
  ```jsx
  <video muted loop playsInline preload="none" poster="/images/hero-poster.jpg" />
  ```
- **Autoplay solo en escritorio y buena conexión:**
  ```js
  const ok =
    !window.matchMedia("(max-width: 768px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    (navigator.connection?.saveData !== true) &&
    (!navigator.connection?.effectiveType || !/2g|slow-2g/.test(navigator.connection.effectiveType));
  if (ok) video.play().catch(() => {});
  ```
  En móvil o conexión lenta: mostrar solo el `poster` (imagen < 150 KB).
- **CLS:** reservar siempre el espacio con `aspect-video` para no mover el layout.
- **LCP < 2.5s:** el póster del hero debe precargarse (`<link rel="preload" as="image">`)
  solo si el video es el elemento principal visible.

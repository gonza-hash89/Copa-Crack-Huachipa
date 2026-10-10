/**
 * Analítica modular: cada proveedor se activa solo si su variable
 * de entorno está definida. Sin IDs configurados no se carga
 * ningún script de terceros (privacidad por defecto).
 *
 * Variables (todas opcionales, prefijo NEXT_PUBLIC_):
 * - NEXT_PUBLIC_GA4_ID            ej. G-XXXXXXXXXX
 * - NEXT_PUBLIC_GSC_VERIFICATION  token meta de Search Console
 * - NEXT_PUBLIC_CLARITY_ID        ej. abcdef1234
 * - NEXT_PUBLIC_META_PIXEL_ID     ej. 123456789012345
 */

export const analyticsConfig = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID || "",
  gsc: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  clarity: process.env.NEXT_PUBLIC_CLARITY_ID || "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
};

export function isAnalyticsEnabled() {
  const c = analyticsConfig;
  return Boolean(c.ga4 || c.clarity || c.metaPixel);
}

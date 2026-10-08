import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** true cuando hay credenciales configuradas (local .env.local o Vercel). */
export function isSupabaseConfigured() {
  return Boolean(URL && ANON_KEY);
}

let cached = null;

/**
 * Cliente Supabase (anon key + RLS). Se crea de forma perezosa para que
 * el build y el modo local funcionen aunque no haya credenciales: en ese
 * caso las API routes usan el almacenamiento JSON de respaldo.
 */
export function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (!cached) {
    cached = createClient(URL, ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}

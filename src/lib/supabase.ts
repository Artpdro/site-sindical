import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** true quando as variáveis de ambiente do Supabase estão configuradas. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Cliente Supabase (somente chave pública "anon"). A segurança é garantida
 * pelas políticas RLS definidas em supabase/migrations.
 */
export const supabase = createClient(
  url || "http://localhost:54321",
  anonKey || "public-anon-key-not-configured",
  { auth: { persistSession: true, autoRefreshToken: true } },
);

export const NEWS_BUCKET = "news-images";

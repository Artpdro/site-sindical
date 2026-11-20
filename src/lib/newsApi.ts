import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { News } from "@/lib/news";

const notConfigured = () => new Error("Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.");

/** Notícias publicadas (RLS garante que visitantes só vejam publicadas). */
export async function fetchPublishedNews(limit?: number): Promise<News[]> {
  if (!isSupabaseConfigured) throw notConfigured();
  let q = supabase
    .from("news")
    .select("*")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as News[];
}

export async function fetchNewsBySlug(slug: string): Promise<News | null> {
  if (!isSupabaseConfigured) throw notConfigured();
  const { data, error } = await supabase.from("news").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  if (error) throw error;
  return (data as News) ?? null;
}

import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { News } from "@/lib/news";
import { noticiasEstaticas } from "@/data/noticias";

const byDateDesc = (a: News, b: News) => b.published_at.localeCompare(a.published_at);

/** Notícias publicadas: estáticas + banco (RLS garante que visitantes só vejam publicadas). */
export async function fetchPublishedNews(limit?: number): Promise<News[]> {
  let fromDb: News[] = [];
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });
    // Se o banco falhar, o site continua exibindo as notícias estáticas.
    if (!error) fromDb = (data ?? []) as News[];
  }
  const slugs = new Set(fromDb.map((n) => n.slug));
  const all = [...fromDb, ...noticiasEstaticas.filter((n) => !slugs.has(n.slug))].sort(byDateDesc);
  return limit ? all.slice(0, limit) : all;
}

export async function fetchNewsBySlug(slug: string): Promise<News | null> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from("news").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
    if (!error && data) return data as News;
  }
  return noticiasEstaticas.find((n) => n.slug === slug) ?? null;
}

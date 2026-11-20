export const NEWS_CATEGORIES = ["Institucional", "Eventos", "Convenção Coletiva", "Comércio", "Jurídico", "Outros"] as const;

export interface News {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_url: string | null;
  category: string;
  status: "draft" | "published";
  published_at: string;
  created_at: string;
  updated_at: string;
}

export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

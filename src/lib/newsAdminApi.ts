import { supabase, NEWS_BUCKET } from "@/lib/supabase";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export async function uploadCover(file: File): Promise<string> {
  if (!ALLOWED.includes(file.type)) throw new Error("Formato inválido. Use JPG, PNG ou WebP.");
  if (file.size > MAX_BYTES) throw new Error("A imagem deve ter no máximo 5 MB.");
  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(NEWS_BUCKET).upload(path, file, { contentType: file.type, cacheControl: "31536000" });
  if (error) throw new Error("Falha ao enviar a imagem.");
  return supabase.storage.from(NEWS_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Remove do storage a imagem (se for do nosso bucket). Falhas são ignoradas. */
export async function removeCover(url: string | null | undefined) {
  if (!url) return;
  const marker = `/${NEWS_BUCKET}/`;
  const i = url.indexOf(marker);
  if (i === -1) return;
  await supabase.storage.from(NEWS_BUCKET).remove([decodeURIComponent(url.slice(i + marker.length))]);
}

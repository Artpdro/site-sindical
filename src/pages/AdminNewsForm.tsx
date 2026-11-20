import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { NEWS_CATEGORIES, slugify, type News } from "@/lib/news";
import { uploadCover, removeCover } from "@/lib/newsAdminApi";

const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

const AdminNewsForm = () => {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string>(NEWS_CATEGORIES[0]);
  const [publishedAt, setPublishedAt] = useState(toLocalInput(new Date().toISOString()));
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [originalCover, setOriginalCover] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const { data: existing, isLoading } = useQuery({
    queryKey: ["admin-news", id],
    enabled: !isNew,
    queryFn: async () => {
      const { data, error } = await supabase.from("news").select("*").eq("id", id!).maybeSingle();
      if (error) throw error;
      return data as News | null;
    },
  });

  useEffect(() => {
    if (!existing) return;
    setTitle(existing.title); setSummary(existing.summary); setContent(existing.content);
    setCategory(existing.category); setPublishedAt(toLocalInput(existing.published_at));
    setCoverUrl(existing.cover_url); setOriginalCover(existing.cover_url);
  }, [existing]);

  useEffect(() => { document.title = `${isNew ? "Nova notícia" : "Editar notícia"} | Sindilojas Garanhuns`; }, [isNew]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (title.trim().length < 3 || title.length > 200) e.title = "Informe um título (3 a 200 caracteres).";
    if (summary.trim().length < 3 || summary.length > 500) e.summary = "Informe uma descrição resumida (até 500 caracteres).";
    if (content.trim().length < 10) e.content = "Escreva o conteúdo completo da notícia.";
    if (!publishedAt) e.publishedAt = "Informe a data de publicação.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async (status: "draft" | "published") => {
    if (!validate()) return;
    setSaving(true);
    try {
      let cover = coverUrl;
      if (file) cover = await uploadCover(file);

      const payload = {
        title: title.trim(), summary: summary.trim(), content: content.trim(), category,
        status, cover_url: cover, published_at: new Date(publishedAt).toISOString(),
      };

      if (isNew) {
        const base = slugify(title) || "noticia";
        const { error } = await supabase.from("news").insert({ ...payload, slug: `${base}-${Date.now().toString(36)}` });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").update(payload).eq("id", id!);
        if (error) throw error;
      }
      if (originalCover && originalCover !== cover) await removeCover(originalCover);

      qc.invalidateQueries({ queryKey: ["admin-news"] });
      qc.invalidateQueries({ queryKey: ["news"] });
      toast({ title: status === "published" ? "Notícia publicada" : "Rascunho salvo" });
      navigate("/admin");
    } catch (err) {
      toast({ title: "Não foi possível salvar", description: err instanceof Error ? err.message : undefined, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const preview = file ? URL.createObjectURL(file) : coverUrl;

  if (!isNew && isLoading) return <div className="p-8 text-sm text-muted-foreground">Carregando…</div>;
  if (!isNew && !isLoading && !existing) return <div className="p-8 text-sm">Notícia não encontrada. <Link className="text-primary underline" to="/admin">Voltar</Link></div>;

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container max-w-3xl">
        <Link to="/admin" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent"><ArrowLeft className="h-4 w-4" />Voltar ao painel</Link>
        <h1 className="mt-3 font-display text-2xl font-bold text-foreground">{isNew ? "Nova notícia" : "Editar notícia"}</h1>

        <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-5 border border-border bg-card p-5 md:p-7" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="title">Título *</Label>
            <Input id="title" value={title} maxLength={200} onChange={(e) => setTitle(e.target.value)} aria-invalid={!!errors.title} />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="summary">Descrição resumida *</Label>
            <Textarea id="summary" rows={3} value={summary} maxLength={500} onChange={(e) => setSummary(e.target.value)} aria-invalid={!!errors.summary} />
            <p className="text-xs text-muted-foreground">{summary.length}/500</p>
            {errors.summary && <p className="text-xs text-destructive">{errors.summary}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="content">Conteúdo completo *</Label>
            <Textarea id="content" rows={14} value={content} onChange={(e) => setContent(e.target.value)} aria-invalid={!!errors.content} />
            <p className="text-xs text-muted-foreground">Texto simples. Use uma linha em branco para separar parágrafos.</p>
            {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{NEWS_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="publishedAt">Data de publicação *</Label>
              <Input id="publishedAt" type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
              {errors.publishedAt && <p className="text-xs text-destructive">{errors.publishedAt}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover">Imagem de capa</Label>
            {preview && (
              <div className="relative w-full max-w-sm">
                <img src={preview} alt="Pré-visualização da capa" className="aspect-[4/3] w-full object-cover" />
                <button type="button" onClick={() => { setFile(null); setCoverUrl(null); }} className="absolute right-2 top-2 bg-card p-1 shadow" aria-label="Remover imagem"><X className="h-4 w-4" /></button>
              </div>
            )}
            <label htmlFor="cover" className="inline-flex cursor-pointer items-center gap-2 border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-secondary">
              <ImagePlus className="h-4 w-4" /> {preview ? "Trocar imagem" : "Escolher imagem"}
            </label>
            <input id="cover" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                if (f.size > 5 * 1024 * 1024) { toast({ title: "Imagem acima de 5 MB", variant: "destructive" }); return; }
                setFile(f);
              }} />
            <p className="text-xs text-muted-foreground">JPG, PNG ou WebP, até 5 MB.</p>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <Button type="button" onClick={() => save("published")} disabled={saving}>{saving ? "Salvando…" : "Publicar"}</Button>
            <Button type="button" variant="outline" onClick={() => save("draft")} disabled={saving}>Salvar como rascunho</Button>
            <Button type="button" variant="ghost" asChild><Link to="/admin">Cancelar</Link></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminNewsForm;

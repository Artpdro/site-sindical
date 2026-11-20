import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Eye, EyeOff, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import Brand from "@/components/Brand";
import { useAuth } from "@/admin/AuthContext";
import { supabase } from "@/lib/supabase";
import { formatDate, type News } from "@/lib/news";
import { removeCover } from "@/lib/newsAdminApi";

const AdminDashboard = () => {
  const { signOut, session } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [toDelete, setToDelete] = useState<News | null>(null);

  useEffect(() => { document.title = "Painel | Sindilojas Garanhuns"; }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => {
      const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as News[];
    },
  });

  const refresh = () => { qc.invalidateQueries({ queryKey: ["admin-news"] }); qc.invalidateQueries({ queryKey: ["news"] }); };

  const toggle = useMutation({
    mutationFn: async (n: News) => {
      const next = n.status === "published" ? "draft" : "published";
      const { error } = await supabase.from("news").update({ status: next }).eq("id", n.id);
      if (error) throw error;
      return next;
    },
    onSuccess: (next) => { refresh(); toast({ title: next === "published" ? "Notícia publicada" : "Notícia retirada do ar" }); },
    onError: () => toast({ title: "Não foi possível alterar o status", variant: "destructive" }),
  });

  const del = useMutation({
    mutationFn: async (n: News) => {
      const { error } = await supabase.from("news").delete().eq("id", n.id);
      if (error) throw error;
      await removeCover(n.cover_url);
    },
    onSuccess: () => { refresh(); setToDelete(null); toast({ title: "Notícia excluída" }); },
    onError: () => toast({ title: "Não foi possível excluir", variant: "destructive" }),
  });

  return (
    <div className="min-h-screen bg-secondary">
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <Brand />
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:block">{session?.user.email}</span>
            <Button variant="ghost" size="sm" asChild><Link to="/noticias"><ExternalLink className="mr-1.5 h-4 w-4" />Ver site</Link></Button>
            <Button variant="outline" size="sm" onClick={signOut}><LogOut className="mr-1.5 h-4 w-4" />Sair</Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Notícias</h1>
            <p className="text-sm text-muted-foreground">Crie, edite, publique ou retire notícias do ar.</p>
          </div>
          <Button asChild><Link to="/admin/noticias/nova"><Plus className="mr-1.5 h-4 w-4" />Nova notícia</Link></Button>
        </div>

        <div className="mt-6 overflow-x-auto border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead className="hidden md:table-cell">Categoria</TableHead>
                <TableHead className="hidden sm:table-cell">Publicação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">Carregando…</TableCell></TableRow>}
              {error && <TableRow><TableCell colSpan={5} className="py-8 text-center text-destructive">Erro ao carregar notícias.</TableCell></TableRow>}
              {data?.length === 0 && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">Nenhuma notícia cadastrada.</TableCell></TableRow>}
              {data?.map((n) => (
                <TableRow key={n.id}>
                  <TableCell className="max-w-[16rem] truncate font-medium">{n.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{n.category}</TableCell>
                  <TableCell className="hidden sm:table-cell">{formatDate(n.published_at)}</TableCell>
                  <TableCell>
                    <Badge variant={n.status === "published" ? "default" : "secondary"}>{n.status === "published" ? "Publicada" : "Rascunho"}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" title={n.status === "published" ? "Retirar do ar" : "Publicar"} aria-label={n.status === "published" ? "Retirar do ar" : "Publicar"} onClick={() => toggle.mutate(n)} disabled={toggle.isPending}>
                        {n.status === "published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" asChild title="Editar" aria-label="Editar"><Link to={`/admin/noticias/${n.id}`}><Pencil className="h-4 w-4" /></Link></Button>
                      <Button variant="ghost" size="icon" title="Excluir" aria-label="Excluir" onClick={() => setToDelete(n)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir notícia?</AlertDialogTitle>
            <AlertDialogDescription>“{toDelete?.title}” será excluída permanentemente. Esta ação não pode ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => toDelete && del.mutate(toDelete)}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;

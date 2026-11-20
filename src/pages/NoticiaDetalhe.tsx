import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EmptyState } from "@/components/PageLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchNewsBySlug } from "@/lib/newsApi";
import { formatDate } from "@/lib/news";
import { isSupabaseConfigured } from "@/lib/supabase";

const NoticiaDetalhe = () => {
  const { slug = "" } = useParams();
  const { data, isLoading, error } = useQuery({ queryKey: ["news", slug], queryFn: () => fetchNewsBySlug(slug), enabled: isSupabaseConfigured });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background py-10 md:py-16">
        <div className="container max-w-3xl">
          <Link to="/noticias" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent">
            <ArrowLeft className="h-4 w-4" /> Todas as notícias
          </Link>
          {isLoading ? (
            <Skeleton className="mt-6 h-96 w-full" />
          ) : error || !data ? (
            <div className="mt-6"><EmptyState title="Notícia não encontrada" description="Ela pode ter sido removida ou ainda não foi publicada." /></div>
          ) : (
            <article className="mt-6">
              <span className="bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{data.category}</span>
              <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight text-foreground md:text-4xl">{data.title}</h1>
              <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" /> {formatDate(data.published_at)}
              </div>
              {data.cover_url && <img src={data.cover_url} alt={data.title} className="mt-6 max-h-[28rem] w-full object-cover" />}
              <p className="mt-6 text-base font-medium leading-relaxed text-foreground">{data.summary}</p>
              {/* Conteúdo exibido como texto puro (React escapa HTML), preservando quebras de linha. */}
              <div className="mt-6 whitespace-pre-line text-base leading-relaxed text-foreground/90">{data.content}</div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NoticiaDetalhe;

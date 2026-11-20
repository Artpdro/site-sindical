import { useQuery } from "@tanstack/react-query";
import { PageLayout, EmptyState } from "@/components/PageLayout";
import NewsCard from "@/components/NewsCard";
import { fetchPublishedNews } from "@/lib/newsApi";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

const Noticias = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ["news", "all"], queryFn: () => fetchPublishedNews(), enabled: isSupabaseConfigured });

  return (
    <PageLayout title="Notícias" subtitle="Acompanhe as novidades do Sindilojas Garanhuns e do comércio.">
      <section className="bg-background py-12 md:py-16">
        <div className="container">
          {!isSupabaseConfigured ? (
            <EmptyState title="Notícias indisponíveis" description="O serviço de notícias ainda não foi configurado." />
          ) : isLoading ? (
            <div className="grid gap-5 md:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-80 w-full" />)}</div>
          ) : error ? (
            <EmptyState title="Não foi possível carregar as notícias" description="Tente novamente em alguns instantes." />
          ) : !data || data.length === 0 ? (
            <EmptyState title="Nenhuma notícia publicada ainda" description="Em breve você encontrará aqui as novidades do sindicato." />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{data.map((n) => <NewsCard key={n.id} item={n} />)}</div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Noticias;

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsCard from "@/components/NewsCard";
import { fetchPublishedNews } from "@/lib/newsApi";
import { isSupabaseConfigured } from "@/lib/supabase";

const NewsPreview = () => {
  const { data } = useQuery({ queryKey: ["news", "latest"], queryFn: () => fetchPublishedNews(3), enabled: isSupabaseConfigured });
  // Sem notícias publicadas (ou sem backend), a seção não é exibida na home.
  if (!data || data.length === 0) return null;

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Últimas Notícias</h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">Fique por dentro das novidades do sindicato e do comércio.</p>
          </div>
          <Button variant="ghost" className="hidden md:inline-flex" asChild>
            <Link to="/noticias">Ver todas<ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {data.map((n) => <NewsCard key={n.id} item={n} />)}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild><Link to="/noticias">Ver todas as notícias</Link></Button>
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;

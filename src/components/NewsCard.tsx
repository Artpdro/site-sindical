import { Link } from "react-router-dom";
import { Calendar, Newspaper } from "lucide-react";
import { formatDate, type News } from "@/lib/news";

const NewsCard = ({ item }: { item: News }) => (
  <Link
    to={`/noticias/${item.slug}`}
    className="group flex flex-col overflow-hidden border border-border bg-card shadow-card transition-all duration-200 hover:border-primary/30 hover:shadow-card-hover"
  >
    <div className="aspect-[4/3] overflow-hidden bg-secondary">
      {item.cover_url ? (
        <img src={item.cover_url} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-primary/40">
          <Newspaper className="h-10 w-10" />
        </div>
      )}
    </div>
    <div className="flex flex-1 flex-col p-6">
      <span className="mb-2 w-fit bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{item.category}</span>
      <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-card-foreground">{item.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{item.summary}</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        {formatDate(item.published_at)}
      </div>
    </div>
  </Link>
);

export default NewsCard;

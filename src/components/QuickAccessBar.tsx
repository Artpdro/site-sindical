import { Link } from "react-router-dom";
import { CalendarCheck, FileText, Newspaper, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: CalendarCheck, title: "Solicitação de Domingos e Feriados", text: "Peça autorização para funcionamento da sua empresa.", to: "/solicitacao-domingos-feriados", featured: true },
  { icon: FileText, title: "Convenções Coletivas", text: "CCTs, termos aditivos e documentos.", to: "/convencoes-coletivas" },
  { icon: Newspaper, title: "Notícias", text: "Acompanhe as novidades do sindicato.", to: "/noticias" },
];

const QuickAccessBar = () => (
  <section className="border-b border-border bg-secondary/50 py-8 md:py-10">
    <div className="container grid gap-4 md:grid-cols-3">
      {items.map((it, i) => (
        <motion.div key={it.to} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.07 }}>
          <Link
            to={it.to}
            className={`group flex h-full items-center gap-4 border-2 p-5 transition-all hover:shadow-card-hover ${
              it.featured ? "border-accent/50 bg-accent/5 hover:border-accent" : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center ${it.featured ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary"}`}>
              <it.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-sm font-bold text-foreground">{it.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{it.text}</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

export default QuickAccessBar;

import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, MapPin } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

const Pending = ({ children }: { children: string }) => (
  <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">{children}</p>
);

const QuemSomos = () => (
  <PageLayout title="Quem Somos" subtitle="Conheça o Sindilojas Garanhuns – Sindicato do Comércio da cidade de Garanhuns.">
    <section className="bg-background py-14 md:py-20">
      <div className="container max-w-4xl">
        <p className="text-base leading-relaxed text-foreground">
          O <strong>Sindilojas Garanhuns – Sindicato do Comércio da cidade de Garanhuns</strong> é um sindicato patronal voltado exclusivamente à representação das empresas do comércio.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[{ icon: Target, title: "Missão" }, { icon: Eye, title: "Visão" }].map((item) => (
            <div key={item.title} className="border border-border bg-card p-6 shadow-card">
              <div className="mb-3 flex h-10 w-10 items-center justify-center bg-primary/10 text-primary"><item.icon className="h-5 w-5" /></div>
              <h2 className="font-display text-lg font-bold text-card-foreground">{item.title}</h2>
              <Pending>Conteúdo em breve.</Pending>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-card-foreground">Nossa história</h2>
            <Pending>Informações institucionais em breve.</Pending>
          </div>
          <div className="border border-border bg-card p-6 shadow-card">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-card-foreground"><MapPin className="h-4 w-4 text-primary" />Área de abrangência</h2>
            <Pending>Informações em breve.</Pending>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link to="/diretoria">Conheça a Diretoria<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default QuemSomos;

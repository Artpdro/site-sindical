import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";

const Servicos = () => (
  <PageLayout title="Serviços" subtitle="Serviços do Sindilojas Garanhuns – Sindicato do Comércio da cidade de Garanhuns para as empresas do comércio.">
    <section className="bg-background py-10 md:py-14">
      <div className="container max-w-5xl space-y-4">
        {services.map((s) => (
          <div key={s.title} className="flex flex-col gap-4 border border-border bg-card p-4 shadow-card md:flex-row md:items-start md:p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary/10 text-primary"><s.icon className="h-6 w-6" /></div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-bold text-card-foreground">{s.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <Link to={s.link} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent">
                Acessar <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="bg-secondary py-12">
      <div className="container text-center">
        <h2 className="font-display text-xl font-bold text-foreground">Precisa de algum serviço?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Entre em contato para mais informações.</p>
        <Button size="lg" className="mt-5" asChild><Link to="/contato">Fale Conosco<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </div>
    </section>
  </PageLayout>
);

export default Servicos;

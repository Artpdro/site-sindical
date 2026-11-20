import { ExternalLink, Handshake } from "lucide-react";
import { PageLayout, EmptyState } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { parceiros } from "@/data/parceiros";

const Convenios = () => (
  <PageLayout title="Parceiros / Convênios" subtitle="Empresas parceiras, instituições e convênios do Sindilojas Garanhuns.">
    <section className="bg-background py-12 md:py-16">
      <div className="container max-w-5xl">
        {parceiros.length === 0 ? (
          <EmptyState title="Parceiros em breve" description="Os parceiros e convênios do Sindilojas Garanhuns serão divulgados aqui." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {parceiros.map((p) => (
              <article key={p.id} className="flex flex-col border border-border bg-card p-5 shadow-card">
                <div className="flex h-16 w-16 items-center justify-center bg-white p-2">
                  {p.logo ? <img src={p.logo} alt={`Logo ${p.nome}`} className="h-full w-full object-contain" /> : <Handshake className="h-7 w-7 text-primary" />}
                </div>
                <h2 className="mt-3 font-display text-base font-bold text-card-foreground">{p.nome}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.descricao}</p>
                {p.beneficios && p.beneficios.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {p.beneficios.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-card-foreground"><CheckCircle className="h-3.5 w-3.5 shrink-0 text-success" />{b}</li>
                    ))}
                  </ul>
                )}
                {p.link && (
                  <Button variant="outline" size="sm" className="mt-4 w-fit" asChild>
                    <a href={p.link} target="_blank" rel="noopener noreferrer">Acessar<ExternalLink className="ml-1.5 h-3.5 w-3.5" /></a>
                  </Button>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  </PageLayout>
);

export default Convenios;

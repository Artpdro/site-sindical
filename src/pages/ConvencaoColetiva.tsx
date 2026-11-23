import { Download, FileText } from "lucide-react";
import { PageLayout, EmptyState } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { documentos, type DocumentoCategoria } from "@/data/convencoes";

const secoes: { key: DocumentoCategoria; titulo: string; vazio: string }[] = [
  { key: "cct", titulo: "Convenções Coletivas de Trabalho (CCT)", vazio: "Nenhuma convenção coletiva disponível no momento." },
  { key: "aditivo", titulo: "Termos Aditivos", vazio: "Nenhum termo aditivo disponível no momento." },
  { key: "complementar", titulo: "Documentos Complementares", vazio: "Nenhum documento complementar disponível no momento." },
];

const ConvencaoColetiva = () => (
  <PageLayout title="Convenções Coletivas" subtitle="Consulte e baixe as convenções coletivas e documentos do Sindilojas Garanhuns – Sindicato do Comércio da cidade de Garanhuns.">
    <section className="bg-background py-12 md:py-16">
      <div className="container max-w-4xl space-y-12">
        {secoes.map((s) => (
          <div key={s.key}>
            <h2 className="font-display text-xl font-bold text-foreground">{s.titulo}</h2>
            <div className="mt-4">
              {documentos[s.key].length === 0 ? (
                <EmptyState title={s.vazio} description="Os documentos serão disponibilizados em breve." />
              ) : (
                <ul className="space-y-3">
                  {documentos[s.key].map((d) => (
                    <li key={d.id} className="flex flex-col gap-3 border border-border bg-card p-4 shadow-card sm:flex-row sm:items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10 text-primary"><FileText className="h-5 w-5" /></div>
                      <div className="flex-1">
                        <h3 className="font-display text-sm font-semibold text-card-foreground">{d.titulo}</h3>
                        {(d.vigencia || d.descricao) && <p className="text-xs text-muted-foreground">{[d.vigencia, d.descricao].filter(Boolean).join(" – ")}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild><a href={d.url} target="_blank" rel="noopener noreferrer">Visualizar</a></Button>
                        <Button size="sm" asChild><a href={d.url} download><Download className="mr-1.5 h-4 w-4" />Baixar PDF</a></Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default ConvencaoColetiva;

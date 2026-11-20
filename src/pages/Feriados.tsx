import { PageLayout, EmptyState } from "@/components/PageLayout";
import { feriados } from "@/data/feriados";

const Feriados = () => (
  <PageLayout title="Feriados" subtitle="Calendário e regras de funcionamento do comércio em feriados.">
    <section className="bg-background py-12 md:py-16">
      <div className="container max-w-4xl">
        {feriados.length === 0 ? (
          <EmptyState title="Conteúdo em breve" description="As informações sobre feriados e funcionamento do comércio serão publicadas pelo Sindilojas Garanhuns." />
        ) : (
          <ul className="divide-y divide-border border border-border bg-card">
            {feriados.map((f) => (
              <li key={f.id} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:gap-6">
                <time dateTime={f.data} className="w-32 shrink-0 font-display text-sm font-bold text-primary">
                  {new Date(`${f.data}T12:00:00`).toLocaleDateString("pt-BR")}
                </time>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{f.nome}</p>
                  {f.observacao && <p className="text-xs text-muted-foreground">{f.observacao}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  </PageLayout>
);

export default Feriados;

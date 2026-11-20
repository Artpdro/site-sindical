import { Users } from "lucide-react";
import { PageLayout, EmptyState } from "@/components/PageLayout";
import { diretoria } from "@/data/diretoria";

const Diretoria = () => (
  <PageLayout title="Diretoria" subtitle="Integrantes da diretoria do Sindilojas Garanhuns.">
    <section className="bg-background py-12 md:py-16">
      <div className="container max-w-4xl">
        {diretoria.length === 0 ? (
          <EmptyState title="Diretoria em breve" description="Os integrantes da diretoria serão apresentados nesta página." />
        ) : (
          <div className="space-y-10">
            {diretoria.map((g) => (
              <div key={g.titulo}>
                <h2 className="font-display text-xl font-bold text-foreground">{g.titulo}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {g.membros.map((m) => (
                    <div key={`${m.cargo}-${m.nome}`} className="flex items-center gap-4 border border-border bg-card p-4 shadow-card">
                      {m.foto ? <img src={m.foto} alt={m.nome} className="h-12 w-12 object-cover" /> : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary/10 text-primary"><Users className="h-5 w-5" /></div>
                      )}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-accent">{m.cargo}</p>
                        <p className="text-sm font-medium text-card-foreground">{m.nome}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  </PageLayout>
);

export default Diretoria;

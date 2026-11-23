import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, CalendarCheck, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { anosFeriados, feriadosNacionais, type Feriado } from "@/data/feriados";

const diaSemana = (iso: string) => {
  const s = new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { weekday: "long" });
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const dataCurta = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;

const FeriadoTable = ({ feriados }: { feriados: Feriado[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border bg-secondary/50">
          <th className="px-4 py-3 text-left font-semibold text-card-foreground">Data</th>
          <th className="hidden px-4 py-3 text-left font-semibold text-card-foreground sm:table-cell">Dia</th>
          <th className="px-4 py-3 text-left font-semibold text-card-foreground">Feriado</th>
          <th className="hidden px-4 py-3 text-left font-semibold text-card-foreground md:table-cell">Tipo</th>
          <th className="hidden px-4 py-3 text-left font-semibold text-card-foreground lg:table-cell">Lei</th>
        </tr>
      </thead>
      <tbody>
        {feriados.map((f) => (
          <tr key={f.data} className="border-b border-border/50 transition-colors hover:bg-secondary/30">
            <td className="whitespace-nowrap px-4 py-3 font-medium text-card-foreground">{dataCurta(f.data)}</td>
            <td className="hidden whitespace-nowrap px-4 py-3 text-muted-foreground sm:table-cell">{diaSemana(f.data)}</td>
            <td className="px-4 py-3 text-muted-foreground">{f.nome}</td>
            <td className="hidden px-4 py-3 md:table-cell">
              <span className="inline-block rounded-sm bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{f.tipo}</span>
            </td>
            <td className="hidden px-4 py-3 text-xs text-muted-foreground lg:table-cell">{f.lei}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Feriados = () => {
  const atual = new Date().getFullYear();
  const padrao = String(anosFeriados.includes(atual) ? atual : anosFeriados[0]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary py-10 md:py-14">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center border border-primary-foreground/20 bg-primary-foreground/10">
                <CalendarDays className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">Feriados</h1>
                <p className="mt-0.5 text-sm text-primary-foreground/70">Consulte os feriados nacionais e solicite abertura do seu estabelecimento</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-background py-10 md:py-14">
          <div className="container max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-5 border border-primary/20 bg-card p-6 transition-shadow hover:shadow-card-hover md:flex-row md:items-center md:p-7"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10">
                <CalendarCheck className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-lg font-bold text-card-foreground">Solicitar Abertura em Domingos e Feriados</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Empresas do comércio podem solicitar autorização para funcionamento nessas datas.</p>
              </div>
              <Button size="lg" asChild>
                <Link to="/solicitacao-domingos-feriados">Solicitar Abertura<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10">
              <h2 className="font-display text-xl font-bold text-foreground">Feriados Nacionais</h2>
              <p className="mt-1 text-sm text-muted-foreground">Selecione o ano para visualizar a relação de feriados nacionais.</p>

              <div className="mt-6">
                <Tabs defaultValue={padrao}>
                  <TabsList className="w-full">
                    {anosFeriados.map((ano) => (
                      <TabsTrigger key={ano} value={String(ano)} className="flex-1">{ano}</TabsTrigger>
                    ))}
                  </TabsList>
                  {anosFeriados.map((ano) => (
                    <TabsContent key={ano} value={String(ano)} className="mt-4">
                      <div className="border border-border bg-card shadow-card">
                        <FeriadoTable feriados={feriadosNacionais(ano)} />
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Feriados estaduais, municipais e datas previstas em convenção coletiva serão divulgados pelo Sindilojas Garanhuns – Sindicato do Comércio da cidade de Garanhuns.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Feriados;

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
        <div className="space-y-4 text-base leading-relaxed text-foreground">
          <p>
            O <strong>Sindilojas Garanhuns – Sindicato do Comércio da cidade de Garanhuns</strong> é um sindicato patronal voltado exclusivamente à representação das empresas do comércio, em especial do comércio varejista, defendendo os interesses da categoria econômica perante trabalhadores, poder público e sociedade.
          </p>
          <p>
            Como entidade sindical, atua na negociação e na assinatura das Convenções Coletivas de Trabalho junto ao sindicato dos empregados, estabelecendo condições como piso salarial, reajustes e regras de jornada que dão segurança jurídica a lojistas e colaboradores. Essas convenções estão disponíveis para consulta e download neste site.
          </p>
          <p>
            O sindicato também orienta as empresas em temas do dia a dia do comércio, como o funcionamento em domingos e feriados, a interpretação das normas coletivas e as obrigações trabalhistas e sindicais, além de promover a aproximação entre os empresários, por meio de convênios, eventos, capacitações e ações em parceria com instituições como o Sistema Fecomércio, o Sebrae, o Sesc e o Senac.
          </p>
          <p>
            Fortalecer o comércio local, valorizar o empreendedor garanhuense e contribuir para o desenvolvimento econômico da cidade são os compromissos que guiam o trabalho do Sindilojas Garanhuns.
          </p>
        </div>

        <h2 className="mt-12 font-display text-xl font-bold text-foreground">Nossa atuação</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["Representação", "Defesa dos interesses coletivos das empresas do comércio."],
            ["Negociação coletiva", "Convenções Coletivas de Trabalho e termos aditivos com o sindicato dos empregados."],
            ["Orientação às empresas", "Esclarecimentos sobre normas, funcionamento em domingos e feriados e rotinas sindicais."],
            ["Articulação institucional", "Diálogo com o poder público, entidades do Sistema Fecomércio e parceiros do setor."],
            ["Convênios e eventos", "Parcerias, seminários e ações voltadas ao desenvolvimento do varejo."],
            ["Informação", "Notícias e comunicados de interesse da categoria neste site."],
          ].map(([t, d]) => (
            <li key={t} className="border border-border bg-card p-4 shadow-card">
              <h3 className="font-display text-sm font-bold text-card-foreground">{t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>

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
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Garanhuns/PE, conforme a Convenção Coletiva de Trabalho vigente.</p>
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

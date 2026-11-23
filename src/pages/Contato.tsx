import { MapPin, Phone, Mail, Clock, MessageCircle, Share2, ExternalLink } from "lucide-react";
import { PageLayout, EmptyState } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { site, hasContact } from "@/data/site";

const Card = ({ icon: Icon, title, children }: { icon: typeof MapPin; title: string; children: React.ReactNode }) => (
  <div className="border border-border bg-card p-5 shadow-card">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
      <h2 className="font-display text-base font-bold text-card-foreground">{title}</h2>
    </div>
    <div className="mt-3 space-y-1 text-sm text-muted-foreground">{children}</div>
  </div>
);

const Contato = () => {
  const c = site.contact;
  return (
    <PageLayout title="Contato" subtitle="Fale com o Sindilojas Garanhuns – Sindicato do Comércio da cidade de Garanhuns.">
      <section className="bg-background py-12 md:py-16">
        <div className="container max-w-4xl">
          {!hasContact() ? (
            <EmptyState title="Informações de contato em breve" description="Os canais de atendimento do Sindilojas Garanhuns – Sindicato do Comércio da cidade de Garanhuns serão divulgados nesta página." />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {c.address && (
                <Card icon={MapPin} title="Endereço">
                  <p>{c.address}</p>
                  {c.mapsUrl && (
                    <Button variant="outline" size="sm" className="mt-2" asChild>
                      <a href={c.mapsUrl} target="_blank" rel="noopener noreferrer">Ver no mapa<ExternalLink className="ml-1.5 h-3.5 w-3.5" /></a>
                    </Button>
                  )}
                </Card>
              )}
              {c.phones.length > 0 && (
                <Card icon={Phone} title="Telefone">
                  {c.phones.map((p) => <p key={p}><a className="hover:text-primary" href={`tel:${p.replace(/\D/g, "")}`}>{p}</a></p>)}
                </Card>
              )}
              {c.emails.length > 0 && (
                <Card icon={Mail} title="E-mail">
                  {c.emails.map((e) => <p key={e}><a className="hover:text-primary" href={`mailto:${e}`}>{e}</a></p>)}
                </Card>
              )}
              {c.whatsapp && (
                <Card icon={MessageCircle} title="WhatsApp">
                  <a className="hover:text-primary" href={c.whatsapp} target="_blank" rel="noopener noreferrer">Iniciar conversa</a>
                </Card>
              )}
              {c.hours && <Card icon={Clock} title="Horário de atendimento"><p>{c.hours}</p></Card>}
              {c.social.length > 0 && (
                <Card icon={Share2} title="Redes sociais">
                  {c.social.map((s) => <p key={s.url}><a className="hover:text-primary" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></p>)}
                </Card>
              )}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Contato;

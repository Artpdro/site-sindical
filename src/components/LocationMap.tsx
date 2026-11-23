import { MapPin, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

/** Mapa com a localização do Sindilojas Garanhuns (Google Maps incorporado, sem chave de API). */
const LocationMap = () => {
  const { address, phones, mapsUrl, mapQuery } = site.contact;
  if (!address) return null;
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery || address)}&hl=pt-BR&z=17&output=embed`;

  return (
    <section className="bg-background py-16 md:py-24" aria-labelledby="onde-estamos">
      <div className="container">
        <div className="text-center">
          <h2 id="onde-estamos" className="font-display text-2xl font-bold text-foreground md:text-3xl">Onde Estamos</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">Visite a sede do Sindilojas Garanhuns.</p>
        </div>

        <div className="mt-10 grid overflow-hidden border border-border bg-card shadow-card lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col justify-center gap-5 p-6 md:p-8">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></div>
              <div>
                <h3 className="font-display text-sm font-bold text-card-foreground">Endereço</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{address}</p>
              </div>
            </div>
            {phones.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10 text-primary"><Phone className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-display text-sm font-bold text-card-foreground">Telefone</h3>
                  {phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\D/g, "")}`} className="mt-1 block text-sm text-muted-foreground hover:text-primary">{p}</a>
                  ))}
                </div>
              </div>
            )}
            {mapsUrl && (
              <Button asChild className="w-full sm:w-fit">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer"><Navigation className="mr-2 h-4 w-4" />Como chegar</a>
              </Button>
            )}
          </div>

          <div className="min-h-[320px] bg-secondary lg:min-h-[420px]">
            <iframe
              title="Mapa com a localização do Sindilojas Garanhuns"
              src={embed}
              className="h-full min-h-[320px] w-full border-0 lg:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPreview = () => (
  <section className="bg-secondary py-16 md:py-20">
    <div className="container max-w-3xl text-center">
      <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Quem Somos</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        O Sindilojas Garanhuns – Sindicato do Comércio da cidade de Garanhuns é um sindicato patronal voltado exclusivamente à representação das empresas do comércio.
      </p>
      <Button className="mt-6" asChild>
        <Link to="/quem-somos">
          Conheça o sindicato
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  </section>
);

export default AboutPreview;

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="bg-primary py-16 md:py-20">
    <div className="container text-center">
      <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">Precisa de suporte para sua empresa?</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm text-primary-foreground/70 md:text-base">
        Entre em contato com o Sindilojas Garanhuns – Sindicato do Comércio da cidade de Garanhuns.
      </p>
      <Button size="lg" variant="secondary" className="mt-8" asChild>
        <Link to="/contato">
          Fale Conosco
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  </section>
);

export default CTASection;

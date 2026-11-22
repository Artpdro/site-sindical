import { Link } from "react-router-dom";
import { ArrowRight, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-primary">
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.07]"
      style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
    />
    <div className="container relative z-10 grid min-h-[440px] items-center gap-8 py-14 md:grid-cols-[1.4fr_1fr] md:py-20">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="min-w-0 max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground/90">
          <Store className="h-3.5 w-3.5" />
          Sindicato patronal do comércio
        </div>
        <h1 className="font-display text-3xl font-extrabold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
          Sindilojas <span className="text-accent">Garanhuns</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-primary-foreground/75 md:text-lg">
          Representação e defesa das empresas do comércio, com foco em segurança jurídica, apoio institucional e fortalecimento do setor.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" variant="secondary" className="h-auto min-h-11 w-full whitespace-normal sm:w-auto" asChild>
            <Link to="/solicitacao-domingos-feriados">
              Solicitar Domingos e Feriados
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="w-full border border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
            asChild
          >
            <Link to="/quem-somos">Quem Somos</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;

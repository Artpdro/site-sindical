import { Link } from "react-router-dom";
import { ArrowRight, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import fachada from "@/assets/home/fachada.webp";
import sala from "@/assets/home/sala.webp";
import banner from "@/assets/home/banner.webp";
import mesa from "@/assets/home/mesa.webp";

const fotos = [
  { src: fachada, alt: "Painel com a identidade visual do Sindilojas PE e do Sindicato do Comércio Varejista de Garanhuns" },
  { src: sala, alt: "Sala de atendimento do sindicato com mesa, computador e impressora" },
  { src: banner, alt: "Banner do Cartão do Empresário na parede da sede do sindicato" },
  { src: mesa, alt: "Mesa de atendimento com documentos e material de escritório" },
];

const HeroSection = () => (
  <section className="relative overflow-hidden bg-primary">
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.07]"
      style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
    />
    <div className="container relative z-10 grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-12">
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
        <div className="mt-8">
          <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
            <Link to="/quem-somos">
              Quem Somos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 gap-2 sm:gap-3"
      >
        {fotos.map((f) => (
          <div key={f.src} className="aspect-[4/3] overflow-hidden border border-primary-foreground/15 bg-primary-foreground/5">
            <img src={f.src} alt={f.alt} loading="eager" decoding="async" className="h-full w-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;

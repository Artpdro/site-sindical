import { Link } from "react-router-dom";
import { FileText, CalendarCheck, Handshake, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const services = [
  { icon: CalendarCheck, title: "Domingos e Feriados", description: "Solicite autorização para o funcionamento do seu comércio em domingos e feriados.", link: "/solicitacao-domingos-feriados" },
  { icon: FileText, title: "Convenções Coletivas", description: "Consulte e baixe convenções coletivas, termos aditivos e documentos complementares.", link: "/convencoes-coletivas" },
  { icon: Handshake, title: "Parceiros / Convênios", description: "Conheça instituições e empresas com convênios para o comércio.", link: "/parceiros" },
];

const ServicesPreview = () => (
  <section className="bg-background py-16 md:py-24">
    <div className="container">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Nossos Serviços</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          Serviços para apoiar as empresas do comércio.
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
            <Link to={s.link} className="group flex h-full flex-col border border-border bg-card p-6 shadow-card transition-all duration-200 hover:border-primary/30 hover:shadow-card-hover">
              <div className="mb-4 flex h-11 w-11 items-center justify-center bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold text-card-foreground">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-accent">
                Saiba mais
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesPreview;

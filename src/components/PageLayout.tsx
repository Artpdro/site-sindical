import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Inbox } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const PageLayout = ({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <section className="bg-primary py-14 md:py-20">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-extrabold text-primary-foreground md:text-4xl"
          >
            {title}
          </motion.h1>
          {subtitle && <p className="mt-3 max-w-2xl text-base text-primary-foreground/80">{subtitle}</p>}
        </div>
      </section>
      {children}
    </main>
    <Footer />
  </div>
);

export const EmptyState = ({ title, description }: { title: string; description?: string }) => (
  <div className="flex flex-col items-center border border-dashed border-border bg-card px-6 py-12 text-center">
    <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary">
      <Inbox className="h-6 w-6" />
    </div>
    <h2 className="mt-4 font-display text-base font-bold text-card-foreground">{title}</h2>
    {description && <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>}
  </div>
);

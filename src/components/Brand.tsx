import { Store } from "lucide-react";
import { site } from "@/data/site";

/**
 * Marca do site. Se `site.logoSrc` estiver definido, exibe a logo oficial;
 * caso contrário, mostra uma marca provisória em texto (não é logo oficial).
 */
const Brand = ({ inverted = false, className = "" }: { inverted?: boolean; className?: string }) => {
  if (site.logoSrc) {
    const img = <img src={site.logoSrc} alt={`${site.name} – Sindicato do Comércio Varejista de Garanhuns`} className={`h-11 w-auto md:h-14 ${className}`} />;
    // Logo tem fundo branco: no rodapé escuro, apresentada sobre um painel branco.
    return inverted ? <span className="inline-block bg-white p-2">{img}</span> : img;
  }
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`flex h-10 w-10 items-center justify-center md:h-11 md:w-11 ${
          inverted ? "bg-primary-foreground/10 text-primary-foreground" : "bg-primary text-primary-foreground"
        }`}
      >
        <Store className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`font-display text-base font-extrabold md:text-lg ${inverted ? "text-primary-foreground" : "text-primary"}`}>
          Sindilojas
        </span>
        <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] md:text-xs ${inverted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          Garanhuns
        </span>
      </span>
    </span>
  );
};

export default Brand;

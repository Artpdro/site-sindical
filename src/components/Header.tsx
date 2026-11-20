import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Brand from "@/components/Brand";

export const navLinks = [
  { label: "Início", path: "/" },
  { label: "Quem Somos", path: "/quem-somos" },
  { label: "Serviços", path: "/servicos" },
  { label: "Convenções Coletivas", path: "/convencoes-coletivas" },
  { label: "Domingos e Feriados", path: "/solicitacao-domingos-feriados", highlight: true },
  { label: "Feriados", path: "/feriados" },
  { label: "Notícias", path: "/noticias" },
  { label: "Parceiros / Convênios", path: "/parceiros" },
  { label: "Diretoria", path: "/diretoria" },
  { label: "Contato", path: "/contato" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = (p: string) => (p === "/" ? pathname === "/" : pathname.startsWith(p));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" aria-label="Sindilojas Garanhuns – página inicial" className="flex items-center">
          <Brand />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-md px-2.5 py-2 font-body text-[13px] font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground ${
                isActive(link.path) ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-foreground xl:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-card px-4 pb-4 pt-2 xl:hidden">
          <nav className="flex flex-col gap-1" aria-label="Navegação móvel">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 font-body text-sm font-medium transition-colors ${
                  isActive(link.path) ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

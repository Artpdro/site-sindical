import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Brand from "@/components/Brand";
import { navLinks } from "@/components/Header";
import { site, hasContact } from "@/data/site";

const Footer = () => {
  const c = site.contact;
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Brand inverted />
            <p className="mt-4 text-sm leading-relaxed opacity-80">
              Sindicato patronal voltado à representação das empresas do comércio.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider">Navegação</h4>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm opacity-80 transition-opacity hover:opacity-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider">Contato</h4>
            {hasContact() ? (
              <ul className="mt-4 space-y-3 text-sm">
                {c.address && (
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
                    <span className="opacity-80">{c.address}</span>
                  </li>
                )}
                {c.phones.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 opacity-70" />
                    <span className="opacity-80">{p}</span>
                  </li>
                ))}
                {c.emails.map((e) => (
                  <li key={e} className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 opacity-70" />
                    <a href={`mailto:${e}`} className="opacity-80 hover:opacity-100">{e}</a>
                  </li>
                ))}
                {c.whatsapp && (
                  <li className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 shrink-0 opacity-70" />
                    <a href={c.whatsapp} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">WhatsApp</a>
                  </li>
                )}
                {c.hours && (
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 opacity-70" />
                    <span className="opacity-80">{c.hours}</span>
                  </li>
                )}
              </ul>
            ) : (
              <p className="mt-4 text-sm opacity-70">Informações de contato em breve.</p>
            )}
            <Link to="/contato" className="mt-4 inline-block text-sm font-medium underline-offset-4 opacity-90 hover:underline">
              Página de contato
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-primary-foreground/20 pt-6 text-xs opacity-60 sm:flex-row">
          <span>© {new Date().getFullYear()} Sindilojas Garanhuns – Todos os direitos reservados.</span>
          <Link to="/admin/login" className="hover:opacity-100">Área restrita</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

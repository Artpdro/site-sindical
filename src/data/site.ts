/**
 * Dados institucionais do Sindilojas Garanhuns.
 * Campos em branco ("") serão preenchidos nas próximas etapas.
 * NÃO preencher com dados de terceiros ou fictícios.
 */
export const site = {
  name: "Sindilojas Garanhuns",
  tagline: "Sindicato patronal do comércio",
  /** Caminho da logo oficial em /public. Vazio = usa marca provisória em texto. */
  logoSrc: "/logo.png",
  contact: {
    address: "Av. Santo Antônio, 203, 2º andar, sala 28 — Santo Antônio, Garanhuns - PE, CEP 55293-000",
    phones: ["(87) 3761-2908"],
    emails: [] as string[],
    whatsapp: "",
    hours: "",
    mapsUrl: "",
    social: [] as { label: string; url: string }[],
  },
};

export const hasContact = () =>
  Boolean(
    site.contact.address ||
      site.contact.phones.length ||
      site.contact.emails.length ||
      site.contact.whatsapp ||
      site.contact.hours ||
      site.contact.mapsUrl ||
      site.contact.social.length,
  );

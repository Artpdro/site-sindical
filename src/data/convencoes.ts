export type DocumentoCategoria = "cct" | "aditivo" | "complementar";

export interface Documento {
  id: string;
  titulo: string;
  descricao?: string;
  /** Ano ou vigência, ex.: "2026/2027" */
  vigencia?: string;
  /** URL do PDF (visualização e download) */
  url: string;
}

/** Documentos do Sindilojas Garanhuns. PDFs ficam em /public/documentos. */
export const documentos: Record<DocumentoCategoria, Documento[]> = {
  cct: [
    {
      id: "cct-2026-2027",
      titulo: "Convenção Coletiva de Trabalho 2026/2027",
      vigencia: "Vigência: 01/03/2026 a 28/02/2027",
      descricao: "Empregados do Comércio Varejista de Garanhuns/PE – Registro MTE PE000541/2026",
      url: "/documentos/cct-garanhuns-2026-2027.pdf",
    },
  ],
  aditivo: [],
  complementar: [],
};

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

/** Documentos do Sindilojas Garanhuns. Vazio nesta primeira entrega. */
export const documentos: Record<DocumentoCategoria, Documento[]> = {
  cct: [],
  aditivo: [],
  complementar: [],
};

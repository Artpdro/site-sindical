export interface Membro {
  nome: string;
  cargo: string;
  foto?: string;
}

export interface GrupoDiretoria {
  titulo: string;
  membros: Membro[];
}

/** Diretoria do Sindilojas Garanhuns. Vazio nesta primeira entrega. */
export const diretoria: GrupoDiretoria[] = [];

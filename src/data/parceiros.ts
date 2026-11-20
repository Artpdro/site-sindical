export interface Parceiro {
  id: string;
  nome: string;
  /** URL da logo do parceiro */
  logo?: string;
  descricao: string;
  beneficios?: string[];
  link?: string;
}

/** Parceiros e convênios do Sindilojas Garanhuns. Vazio nesta primeira entrega. */
export const parceiros: Parceiro[] = [];

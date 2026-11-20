export interface Feriado {
  id: string;
  data: string; // AAAA-MM-DD
  nome: string;
  observacao?: string;
}

/** Feriados e regras de funcionamento do Sindilojas Garanhuns. Vazio nesta primeira entrega. */
export const feriados: Feriado[] = [];

export interface Membro {
  nome: string;
  cargo: string;
  foto?: string;
}

export interface GrupoDiretoria {
  titulo: string;
  membros: Membro[];
}

/** Diretoria do Sindilojas Garanhuns. */
export const diretoria: GrupoDiretoria[] = [
  {
    titulo: "Diretoria",
    membros: [
      { nome: "Paula Cavalcanti de Lucena Rocha", cargo: "Presidente" },
      { nome: "Ivan de Oliveira Gomes Junior", cargo: "Vice-Presidente" },
      { nome: "Marluse Alves Machado", cargo: "Tesoureiro" },
      { nome: "Adriana Vaz de Oliveira Gomes", cargo: "Diretor" },
    ],
  },
  {
    titulo: "Suplentes da Diretoria",
    membros: [
      { nome: "Ana Maria Caldas Barros e Silva", cargo: "Suplente da Diretoria" },
      { nome: "Jose Antonio Filho", cargo: "Suplente da Diretoria" },
      { nome: "Jose Augusto de Almeida", cargo: "Suplente da Diretoria" },
      { nome: "Sebastiana Vicente dos Santos", cargo: "Suplente da Diretoria" },
    ],
  },
  {
    titulo: "Conselho Fiscal",
    membros: [
      { nome: "Fabio Leite Galindo", cargo: "Membro do Conselho Fiscal" },
      { nome: "Josenildo dos Santos Santana", cargo: "Membro do Conselho Fiscal" },
      { nome: "Rizia Braz da Costa", cargo: "Membro do Conselho Fiscal" },
      { nome: "Saulo Origenes Cardoso Rocha", cargo: "Membro do Conselho Fiscal" },
      { nome: "Wagner Roberto Urbano Rodrigues Silvestre", cargo: "Membro do Conselho Fiscal" },
      { nome: "Yara Nunes Ferreira", cargo: "Membro do Conselho Fiscal" },
    ],
  },
];

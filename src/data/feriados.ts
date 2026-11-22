export type TipoFeriado = "Nacional";

export interface Feriado {
  /** AAAA-MM-DD */
  data: string;
  nome: string;
  tipo: TipoFeriado;
  lei: string;
}

/** Sexta-feira da Paixão (dois dias antes da Páscoa). Algoritmo de Meeus/Jones/Butcher. */
const sextaFeiraSanta = (ano: number): string => {
  const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  const pascoa = new Date(Date.UTC(ano, mes - 1, dia));
  pascoa.setUTCDate(pascoa.getUTCDate() - 2);
  return pascoa.toISOString().slice(0, 10);
};

/** Feriados nacionais (Brasil) do ano informado. */
export const feriadosNacionais = (ano: number): Feriado[] => {
  const f = (mmdd: string, nome: string, lei: string): Feriado => ({ data: `${ano}-${mmdd}`, nome, tipo: "Nacional", lei });
  const lista: Feriado[] = [
    f("01-01", "Confraternização Universal", "Lei nº 10.607/2002"),
    { data: sextaFeiraSanta(ano), nome: "Paixão de Cristo", tipo: "Nacional" as const, lei: "Lei nº 9.093/1995" },
    f("04-21", "Tiradentes", "Lei nº 10.607/2002"),
    f("05-01", "Dia do Trabalhador", "Lei nº 10.607/2002"),
    f("09-07", "Independência do Brasil", "Lei nº 10.607/2002"),
    f("10-12", "Nossa Senhora Aparecida", "Lei nº 6.802/1980"),
    f("11-02", "Finados", "Lei nº 10.607/2002"),
    f("11-15", "Proclamação da República", "Lei nº 10.607/2002"),
    f("11-20", "Dia da Consciência Negra", "Lei nº 14.759/2023"),
    f("12-25", "Natal", "Lei nº 10.607/2002"),
  ];
  return lista.sort((x, y) => x.data.localeCompare(y.data));
};

export const anosFeriados = [2026, 2027];

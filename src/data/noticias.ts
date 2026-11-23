import type { News } from "@/lib/news";

/**
 * Notícias estáticas (exibidas mesmo sem backend). Notícias cadastradas pelo painel
 * administrativo (Supabase) são somadas a estas; em caso de mesmo slug, vale a do banco.
 * ATENÇÃO: a data abaixo é provisória – ajuste para a data real da publicação.
 */
export const noticiasEstaticas: News[] = [
  {
    id: "static-seminario-pos-nrf-2026",
    slug: "seminario-pos-nrf-2026-garanhuns",
    title: "Seminário Pós NRF 2026 chega a Garanhuns em 6 de abril",
    summary:
      "Em sua terceira turma, o seminário leva a Garanhuns as principais tendências do varejo mundial, inspiradas na NRF 2026. Inscrições gratuitas.",
    content:
      "Vem aí o Seminário Pós NRF 2026! Em sua terceira turma, o encontro chega a Garanhuns com ainda mais força, levando as principais tendências do varejo mundial, inspiradas na NRF 2026.\n\n" +
      "A próxima parada será em Garanhuns, no dia 6 de abril, das 18h às 22h, no Centro Cultural Sesc, com uma noite de muito conteúdo, inovação e insights que podem transformar o seu negócio.\n\n" +
      "A iniciativa é da Fecomércio PE, com apoio do Sebrae, Sesc, Senac e Sindilojas Garanhuns. Novas cidades também vão receber o seminário.\n\n" +
      "Serviço\nData: 6 de abril\nHorário: das 18h às 22h\nLocal: Centro Cultural Sesc – R. Cônego Benigno Lira, Centro, Garanhuns – PE\nInscrições gratuitas (link disponível no perfil do Sindilojas Garanhuns no Instagram).",
    cover_url: "/noticias/seminario-pos-nrf-2026.jpg",
    category: "Eventos",
    status: "published",
    published_at: "2026-03-23T12:00:00-03:00",
    created_at: "2026-03-23T12:00:00-03:00",
    updated_at: "2026-03-23T12:00:00-03:00",
  },
];

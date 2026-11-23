-- (Opcional: a notícia já aparece como conteúdo estático em src/data/noticias.ts.)
-- Notícia: Seminário Pós NRF 2026 em Garanhuns.
-- Execute no SQL Editor do Supabase (após 001_init.sql). A capa já está em /public/noticias.
insert into public.news (title, slug, summary, content, cover_url, category, status, published_at)
values (
  'Seminário Pós NRF 2026 chega a Garanhuns em 6 de abril',
  'seminario-pos-nrf-2026-garanhuns',
  'Em sua terceira turma, o seminário leva a Garanhuns as principais tendências do varejo mundial, inspiradas na NRF 2026. Inscrições gratuitas.',
  E'Vem aí o Seminário Pós NRF 2026! Em sua terceira turma, o encontro chega a Garanhuns com ainda mais força, levando as principais tendências do varejo mundial, inspiradas na NRF 2026.\n\nA próxima parada será em Garanhuns, no dia 6 de abril, das 18h às 22h, no Centro Cultural Sesc, com uma noite de muito conteúdo, inovação e insights que podem transformar o seu negócio.\n\nA iniciativa é da Fecomércio PE, com apoio do Sebrae, Sesc, Senac e Sindilojas Garanhuns. Novas cidades também vão receber o seminário.\n\nServiço\nData: 6 de abril\nHorário: das 18h às 22h\nLocal: Centro Cultural Sesc – R. Cônego Benigno Lira, Centro, Garanhuns – PE\nInscrições gratuitas (link disponível no perfil do Sindilojas Garanhuns no Instagram).',
  '/noticias/seminario-pos-nrf-2026.jpg',
  'Eventos',
  'published',
  now()
)
on conflict (slug) do nothing;

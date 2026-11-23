# Sindilojas Garanhuns – Site institucional

Vite + React + TypeScript + Tailwind + shadcn/ui, com Supabase (auth, banco e storage) para notícias, área administrativa e solicitações de domingos/feriados.

## Rodando localmente
```bash
npm install --legacy-peer-deps
cp .env.example .env   # preencha com os dados do seu projeto Supabase
npm run dev
```

## Configuração do Supabase
1. Crie um projeto em supabase.com e copie **Project URL** e **anon key** para o `.env` (nunca use a `service_role` no frontend).
2. No **SQL Editor**, execute `supabase/migrations/001_init.sql` (tabelas, RLS, bucket de imagens).
3. **Authentication > Providers > Email**: desative **Allow new users to sign up** (não há cadastro público).
4. **Authentication > Users > Add user**: crie o administrador (e-mail + senha forte, Auto Confirm).
5. Autorize-o como admin no SQL Editor:
   ```sql
   insert into public.admins (user_id) select id from auth.users where email = 'admin@exemplo.com';
   ```
6. Acesse `/admin/login`.

## E-mail das solicitações de domingos/feriados
As solicitações são enviadas pela Edge Function `supabase/functions/holiday-request` (grava no banco e envia e-mail via [Resend](https://resend.com)).
```bash
supabase functions deploy holiday-request --no-verify-jwt
supabase secrets set RESEND_API_KEY=re_xxx NOTIFY_EMAIL=arthurplima17@gmail.com
```
Execute também `supabase/migrations/002_holiday_requests_via_function.sql`. Sem domínio verificado no Resend, o remetente `onboarding@resend.dev` só entrega para o e-mail da conta Resend; para outros destinatários, verifique um domínio e defina `MAIL_FROM`.

## Notícia inicial (opcional)
A notícia do Seminário Pós NRF 2026 já aparece como conteúdo estático (`src/data/noticias.ts`, capa em `public/noticias`). O script `supabase/seed/noticia-seminario-pos-nrf-2026.sql` é opcional: se for executado, a versão do banco passa a valer no lugar da estática.

## Acesso administrativo
Não há link público para o painel: acesse digitando `/admin` (ou `/admin/login`) na URL do site.

## Segurança
- Visitantes só leem notícias `published` (política RLS); criar/editar/excluir exige estar em `public.admins`.
- Solicitações de domingos/feriados: visitantes só podem inserir (nunca ler); administradores acessam pelo painel do Supabase.
- Upload de imagens restrito a admins (JPG/PNG/WebP até 5 MB).

## Conteúdos a preencher (arquivos em `src/data`)
`site.ts` (contato e logo), `diretoria.ts`, `feriados.ts`, `convencoes.ts`, `parceiros.ts`.
Para a logo: coloque o arquivo em `public/` e defina `logoSrc` em `site.ts`.

## Deploy
Site SPA: configure fallback de todas as rotas para `index.html` e as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` no provedor.

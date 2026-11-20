-- Sindilojas Garanhuns – esquema inicial (notícias, administradores, solicitações)
-- Execute no SQL Editor do Supabase (ou via supabase db push).

-- ============ Administradores ============
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- Cada usuário só consegue verificar a si mesmo; ninguém grava na tabela pelo cliente.
drop policy if exists "admins_read_self" on public.admins;
create policy "admins_read_self" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- ============ Notícias ============
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 200),
  slug text not null unique,
  summary text not null check (char_length(summary) between 3 and 500),
  content text not null,
  cover_url text,
  category text not null default 'Institucional',
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists news_status_pub_idx on public.news (status, published_at desc);
alter table public.news enable row level security;

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists news_touch on public.news;
create trigger news_touch before update on public.news
  for each row execute function public.touch_updated_at();

-- Visitantes: somente publicadas e com data já alcançada.
drop policy if exists "news_public_read" on public.news;
create policy "news_public_read" on public.news
  for select to anon, authenticated
  using (status = 'published' and published_at <= now());

-- Administradores: acesso total.
drop policy if exists "news_admin_all" on public.news;
create policy "news_admin_all" on public.news
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ============ Solicitações de domingos e feriados ============
create table if not exists public.holiday_requests (
  id uuid primary key default gen_random_uuid(),
  company_name text not null check (char_length(company_name) between 2 and 200),
  cnpj text not null check (cnpj ~ '^[0-9]{14}$'),
  responsible_name text not null check (char_length(responsible_name) between 2 and 200),
  phone text not null check (char_length(phone) between 10 and 15),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 200),
  request_type text not null check (request_type in ('domingo','feriado')),
  desired_date date not null,
  notes text check (notes is null or char_length(notes) <= 1000),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);
alter table public.holiday_requests enable row level security;

-- Visitantes só podem INSERIR (como pendente); nunca ler, alterar ou excluir.
drop policy if exists "requests_public_insert" on public.holiday_requests;
create policy "requests_public_insert" on public.holiday_requests
  for insert to anon, authenticated
  with check (status = 'pending');

drop policy if exists "requests_admin_all" on public.holiday_requests;
create policy "requests_admin_all" on public.holiday_requests
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ============ Storage (imagens de capa) ============
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('news-images', 'news-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "news_images_public_read" on storage.objects;
create policy "news_images_public_read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'news-images');

drop policy if exists "news_images_admin_write" on storage.objects;
create policy "news_images_admin_write" on storage.objects
  for all to authenticated
  using (bucket_id = 'news-images' and public.is_admin())
  with check (bucket_id = 'news-images' and public.is_admin());

-- ============ Como criar o primeiro administrador ============
-- 1) Authentication > Providers > Email: DESATIVE "Allow new users to sign up".
-- 2) Authentication > Users > Add user (e-mail + senha forte, "Auto Confirm").
-- 3) Rode (trocando o e-mail):
--    insert into public.admins (user_id)
--    select id from auth.users where email = 'admin@exemplo.com';

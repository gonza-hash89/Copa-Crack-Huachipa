-- ============================================================
-- Escuela Lucmar Huachipa · Tabla de opiniones con moderación
-- Ejecutar una vez en el SQL Editor de Supabase (supabase.com)
-- ============================================================

create table if not exists public.opiniones (
  id uuid primary key default gen_random_uuid(),
  nombre text not null check (char_length(nombre) between 2 and 60),
  parentesco text not null check (char_length(parentesco) between 2 and 80),
  puntuacion smallint not null check (puntuacion between 1 and 5),
  opinion text not null check (char_length(opinion) between 10 and 600),
  aprobado boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists opiniones_aprobado_created_idx
  on public.opiniones (aprobado, created_at desc);

-- Seguridad: activar RLS y permitir solo lo necesario con la anon key
alter table public.opiniones enable row level security;

drop policy if exists "opiniones_read_aprobadas" on public.opiniones;
create policy "opiniones_read_aprobadas"
  on public.opiniones for select
  to anon, authenticated
  using (aprobado = true);

drop policy if exists "opiniones_insert_pendiente" on public.opiniones;
create policy "opiniones_insert_pendiente"
  on public.opiniones for insert
  to anon, authenticated
  with check (aprobado = false);

-- La aprobación (UPDATE aprobado=true) queda reservada al rol service_role
-- o a usuarios autenticados con su propia política. No crear policy de
-- update/delete para anon: los visitantes no pueden modificar nada.

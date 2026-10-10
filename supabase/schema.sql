-- ============================================================
-- Escuela Lucmar Huachipa · Tabla de opiniones con moderación
-- Ejecutar una vez en el SQL Editor de Supabase (supabase.com)
-- ============================================================

create table if not exists public.opiniones (
  id uuid primary key default gen_random_uuid(),
  nombre_apoderado text not null check (char_length(nombre_apoderado) between 2 and 60),
  nombre_alumno text check (nombre_alumno is null or char_length(nombre_alumno) between 2 and 80),
  categoria text check (categoria is null or categoria in ('4 - 6 años', '7 - 10 años', '11 - 13 años')),
  estrellas smallint not null default 5 check (estrellas between 1 and 5),
  comentario text not null check (char_length(comentario) between 10 and 600),
  aprobado boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists opiniones_aprobado_created_idx
  on public.opiniones (aprobado, created_at desc);

-- Seguridad: activar RLS y permitir solo lo necesario con la anon key
alter table public.opiniones enable row level security;

drop policy if exists "Lectura publica de opiniones aprobadas" on public.opiniones;
create policy "Lectura publica de opiniones aprobadas"
  on public.opiniones for select
  to anon, authenticated
  using (aprobado = true);

drop policy if exists "Crear opinion publica" on public.opiniones;
create policy "Crear opinion publica"
  on public.opiniones for insert
  to anon, authenticated
  with check (aprobado = false);

-- La aprobación (UPDATE aprobado=true) queda reservada al rol service_role
-- o a usuarios autenticados con su propia política. No crear policy de
-- update/delete para anon: los visitantes no pueden modificar nada.

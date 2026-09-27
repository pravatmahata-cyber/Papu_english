create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  native_language text,
  english_level text check (english_level in ('beginner','elementary','intermediate','upper_intermediate','advanced')),
  learning_goal text,
  daily_goal_minutes integer check (daily_goal_minutes in (5,10,15,20,30,45)),
  avatar_url text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.speaking_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  topic text, transcript text,
  overall_score numeric, pronunciation_score numeric, fluency_score numeric, accuracy_score numeric,
  created_at timestamptz not null default now()
);
create table if not exists public.daily_activity (
  user_id uuid not null references public.profiles(id) on delete cascade,
  activity_date date not null,
  speaking_minutes integer not null default 0,
  xp integer not null default 0,
  primary key(user_id,activity_date)
);
alter table public.profiles enable row level security;
alter table public.speaking_sessions enable row level security;
alter table public.daily_activity enable row level security;
create policy "profiles own select" on public.profiles for select using (auth.uid()=id);
create policy "profiles own insert" on public.profiles for insert with check (auth.uid()=id);
create policy "profiles own update" on public.profiles for update using (auth.uid()=id) with check (auth.uid()=id);
create policy "speaking own all" on public.speaking_sessions for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "activity own all" on public.daily_activity for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id,email) values(new.id,new.email) on conflict(id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

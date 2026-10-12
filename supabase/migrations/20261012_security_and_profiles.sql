-- NCLEX Trainer: per-student progress and row-level security.
-- Run once in the Supabase SQL Editor (safe to re-run).
--
-- What it does
-- 1. Creates a student_profiles row automatically for every new auth user
--    (including anonymous guest sessions), and backfills existing users.
-- 2. Turns on row-level security so the public anon key can only:
--      - read scenarios, questions and study facts
--      - read and insert its OWN responses, and read its own profile
--    Edge functions use the service-role key and are unaffected.
--
-- Also enable: Authentication -> Sign In / Providers -> "Allow anonymous sign-ins".

-- 1. Profiles -------------------------------------------------------------
create or replace function public.handle_new_student()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.student_profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_student on auth.users;
create trigger on_auth_user_created_student
  after insert on auth.users
  for each row execute function public.handle_new_student();

insert into public.student_profiles (id)
select id from auth.users
on conflict (id) do nothing;

-- 2. Row-level security ---------------------------------------------------
alter table public.clinical_scenarios enable row level security;
alter table public.questions          enable row level security;
alter table public.study_facts        enable row level security;
alter table public.student_profiles   enable row level security;
alter table public.student_responses  enable row level security;

-- Content: readable by everyone, writable only by the service role.
drop policy if exists "scenarios are readable" on public.clinical_scenarios;
create policy "scenarios are readable" on public.clinical_scenarios
  for select to anon, authenticated using (true);

drop policy if exists "questions are readable" on public.questions;
create policy "questions are readable" on public.questions
  for select to anon, authenticated using (true);

drop policy if exists "study facts are readable" on public.study_facts;
create policy "study facts are readable" on public.study_facts
  for select to anon, authenticated using (true);

-- Profiles: each student sees only their own.
drop policy if exists "read own profile" on public.student_profiles;
create policy "read own profile" on public.student_profiles
  for select to authenticated using (auth.uid() = id);

-- Responses: each student reads and adds only their own.
drop policy if exists "read own responses" on public.student_responses;
create policy "read own responses" on public.student_responses
  for select to authenticated using (auth.uid() = student_id);

drop policy if exists "insert own responses" on public.student_responses;
create policy "insert own responses" on public.student_responses
  for insert to authenticated with check (auth.uid() = student_id);

-- Helpful index for the Progress page and the generation cost guard.
create index if not exists student_responses_student_idx on public.student_responses (student_id);
create index if not exists questions_created_at_idx on public.questions (created_at);

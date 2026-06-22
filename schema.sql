-- Enable UUID extension if not present
create extension if not exists "uuid-ossp";

-- 1. STUDENT PROFILES
create table public.student_profiles (
    id uuid references auth.users on delete cascade primary key,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    overall_theta_score float default 1.0 not null, -- Adaptive ability rating
    weak_spots text[] default '{}'::text[] not null
);

-- 2. CLINICAL SCENARIOS (The core case studies)
create table public.clinical_scenarios (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    vignette text not null,                       -- The narrative story
    vitals jsonb not null,                        -- BP, HR, RR, SpO2, Temp
    labs jsonb default '{}'::jsonb,               -- Optional lab results
    client_type text not null,                    -- Adult Med-Surg, Peds, Mental Health, etc.
    client_needs_category text,                   -- 2026 NCSBN: 'Safe and Effective Care Environment',
                                                  -- 'Health Promotion and Maintenance', 'Psychosocial Integrity',
                                                  -- 'Physiological Integrity'
    content_area text                             -- e.g., 'Respiratory', 'Cardiovascular', 'OB', 'Endocrine'
);

-- 3. NCLEX QUESTIONS (Linked to Scenarios)
create table public.questions (
    id uuid default uuid_generate_v4() primary key,
    scenario_id uuid references public.clinical_scenarios on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    question_text text not null,
    question_type text default 'multiple_choice' not null, -- multiple_choice, matrix, select_all, highlight, bowtie, cloze
    options jsonb not null,                       -- Array of options: [{"id": "A", "text": "..."}]
    correct_option_ids text[] not null,           -- e.g., ['A'] or ['A', 'C']
    ncjmm_category text not null,                 -- 'Recognize Cues', 'Analyze Cues', 'Prioritize Hypotheses',
                                                  -- 'Generate Solutions', 'Take Action', 'Evaluate Outcomes'
    difficulty_level integer default 2 not null   -- 1 (Easy), 2 (Medium), 3 (Hard)
);

-- 4. STUDENT RESPONSES (For historical tracking & adaptive scoring)
create table public.student_responses (
    id uuid default uuid_generate_v4() primary key,
    student_id uuid references public.student_profiles(id) on delete cascade not null,
    question_id uuid references public.questions(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    selected_option_ids text[] not null,
    is_correct boolean not null
);

-- 5. STUDY FACTS (high-yield reference cards shown in the Cheat Sheet UI)
create table public.study_facts (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    category text not null,        -- 'Lab Values', 'Antidotes', 'Positions', 'Isolation', 'NCJMM', etc.
    title text not null,           -- short label, e.g. 'Potassium (K+)'
    body text not null,            -- one-line memorable fact
    tags text[] default '{}'::text[] not null  -- e.g., ['cardiac', 'electrolyte']
);

create index if not exists study_facts_category_idx on public.study_facts (category);

# NCLEX Adaptive Trainer

A Next.js 15 + Supabase + OpenAI app that practices NCLEX clinical-judgment items.
A student reads a scenario, picks an answer, and an AI preceptor (via a Supabase
Edge Function calling `gpt-4o-mini`) returns a personalized rationale and clinical
insight. Responses are logged for adaptive scoring.

See `../architecture.md` for the system map.

## Stack

- Next.js 15 (App Router, Tailwind)
- Supabase (Postgres + Edge Functions / Deno)
- OpenAI `gpt-4o-mini`

## Setup

1. **Database** — open the Supabase SQL Editor and run `schema.sql`, then
   `seed.sql` (one sample scenario/question so the dashboard isn't empty).
2. **Env** — copy `.env.local.example` to `.env.local` and fill in your
   Supabase project URL + anon key.
3. **Install** — `npm install` (already done if you used the scaffold).
4. **Dev server** — `npm run dev`, then open
   [http://localhost:3000](http://localhost:3000).
5. **Edge function** — from the project root with the Supabase CLI:
   ```bash
   supabase secrets set OPENAI_API_KEY=sk-...
   supabase functions deploy evaluate-clinical-choice
   ```

> Node.js 20.9+ is required by Next.js 15. The scaffolded project will not run on
> Node 16 — upgrade Node before `npm run dev`.

## Layout

```
my-nclex-trainer/
├── schema.sql, seed.sql
├── supabase/functions/evaluate-clinical-choice/index.ts
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx              # Landing
    │   └── dashboard/page.tsx    # Quiz
    ├── components/
    │   ├── ClinicalVignette.tsx
    │   └── QuestionBlock.tsx
    └── utils/supabaseClient.ts
```

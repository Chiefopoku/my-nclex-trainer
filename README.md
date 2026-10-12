# NCLEX Adaptive Trainer

**Live app:** https://my-nclex-trainer.vercel.app/

The NCLEX Adaptive Trainer is a free study tool for the NCLEX-RN, built by a registered nurse. Students work through clinical-judgment scenarios and get a rationale from an AI preceptor after each answer. The app also includes a searchable cheat sheet of 430+ high-yield facts and the 2026 NCLEX-RN test plan.

> NCLEX®, NCLEX-RN® and NCSBN® are registered trademarks of the National Council of State Boards of Nursing, Inc. This project is not affiliated with or endorsed by NCSBN. It is an educational aid, not medical advice.

## Features

- **Practice**
  - Case vignettes with vitals and labs, filterable by content area and NCJMM step.
  - Single-answer and select-all items.
  - After you answer, the correct option is highlighted, your choice is marked, and the AI preceptor explains the reasoning with a clinical pearl.
  - A session score and a "Next scenario" button.
- **AI scenarios:** generates a brand-new original scenario on demand for any content area and NCJMM step (GPT-4o-mini), with an hourly cost cap.
- **Progress**
  - Accuracy by NCJMM step, Client Needs category and content area.
  - Each visitor gets a private anonymous session, so progress is personal without sign-up.
- **Cheat sheet**
  - 432 facts in 29 topics: strategy, delegation, legal, infection control, labs, electrolytes, acid-base, ECG, pharmacology (name endings, interaction hubs, antidotes, drug levels, insulin), body systems, positions, classic signs, maternity, pediatrics, mental health and diets.
  - Search, topic chips, clickable tags, and print or save as PDF.
- **Test plan:** the 2026 NCLEX-RN Client Needs weighting (effective April 2026), the six NCJMM steps and the integrated processes.
- **Practice mode:** if the database is unavailable, the app falls back to built-in questions with written rationales.

## Stack

- **Next.js 16** (App Router), React 19, Tailwind CSS 4, TypeScript
- **Supabase:** Postgres, anonymous Auth, Row-Level Security, Edge Functions (Deno)
- **OpenAI** `gpt-4o-mini`, for rationales and scenario generation
- **Vercel** for hosting

## Project layout

```
src/
  app/
    page.tsx              landing page
    dashboard/page.tsx    practice
    progress/page.tsx     per-student analytics
    study/page.tsx        cheat sheet
    test-plan/page.tsx    2026 test plan reference
    layout.tsx            header, footer, metadata
  components/             NavHeader, SiteFooter, ClinicalVignette, QuestionBlock
  utils/
    supabaseClient.ts     client + private anonymous session (getStudentId)
    cheatSheet.ts         the 432-fact cheat sheet
    demoData.ts           built-in practice questions (offline fallback)
supabase/
  functions/evaluate-clinical-choice   grade, save the attempt, AI rationale
  functions/generate-scenario          AI-written scenario (signed-in session + hourly cap)
  migrations/20261012_security_and_profiles.sql
schema.sql, seed.sql
scripts/bulk-seed-questions.mjs        bulk-generate original items into the bank
```

## Setup

1. **Database:** in the Supabase SQL Editor, run `schema.sql`, then `seed.sql`, then `supabase/migrations/20261012_security_and_profiles.sql`. The migration does two things:
   - It creates a student profile for every new user.
   - It turns on row-level security, so each student can only see their own answers.
2. **Anonymous sign-ins:** in Supabase, go to Authentication → Sign In / Providers and turn on **Allow anonymous sign-ins**. Consider enabling CAPTCHA to limit abuse.
3. **Environment:** copy `.env.local.example` to `.env.local` and add your project URL and anon key. On Vercel, add the same two `NEXT_PUBLIC_…` variables under Settings → Environment Variables.
4. **Install and run:** `npm install`, then `npm run dev`, then open http://localhost:3000. This needs Node 20.9 or later.
5. **Edge functions** (Supabase CLI):

   ```bash
   supabase secrets set OPENAI_API_KEY=sk-...
   supabase secrets set MAX_GENERATIONS_PER_HOUR=20   # optional, default 20
   supabase functions deploy evaluate-clinical-choice
   supabase functions deploy generate-scenario
   ```

6. **Grow the question bank (optional):** `npm run seed:questions`. This uses the service-role key and OpenAI key from `.env.local`. It writes about 180 original items for about $0.50.

## Security notes

- **Secrets:** the browser only ever gets the public anon key. The service-role key and OpenAI key live only in Supabase secrets and `.env.local`, which is git-ignored.
- **Who is answering:** answers are tied to the caller's Supabase session (JWT), not to an id sent by the browser.
- **Row-level security:** students can read and insert only their own responses.
- **AI cost cap:** generation requires a session and is capped per hour.
- **Known limitation:** the question rows the browser reads include `correct_option_ids`. That's acceptable for a practice tool, but a graded exam would need answers checked only on the server.

## Updating the cheat sheet

Facts live in `src/utils/cheatSheet.ts` as `{ category, title, body, tags }`. Extra rows added to the `study_facts` table in Supabase are merged in automatically.

## Author

Built by [Emmanuel Opoku-Adjei, RN](https://chiefopoku.github.io/portfolio/). The cheat sheet is compiled from his own NCLEX-RN review notes, aligned to the 2026 test plan.

#!/usr/bin/env node
// Generate original NCLEX-style scenarios + questions with GPT-4o-mini
// and insert them into Supabase.
//
// Run with:
//   node --env-file=.env.local scripts/bulk-seed-questions.mjs
//
// Required env vars (put them in .env.local):
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY     (NOT the anon key — RLS would block writes)
//   OPENAI_API_KEY
//
// Optional:
//   SEED_PER_COMBO   (default 5)  — questions per content/NCJMM pair
//   SEED_MODEL       (default gpt-4o-mini)
//   SEED_COMBOS      ('all' or comma list like 'Cardiovascular:Recognize Cues')
//
// Total = SEED_PER_COMBO × (content × ncjmm). With defaults: 5 × 6 × 6 = 180 items.
// Cost on gpt-4o-mini for the default run ≈ $0.50.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const PER_COMBO = Number(process.env.SEED_PER_COMBO ?? 5);
const MODEL = process.env.SEED_MODEL ?? 'gpt-4o-mini';

if (!SUPABASE_URL || !SERVICE_ROLE || !OPENAI_KEY) {
  console.error(
    'Missing env. Need NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY in .env.local.'
  );
  process.exit(1);
}

const CONTENT_AREAS = [
  { content: 'Cardiovascular',           client_needs: 'Physiological Integrity' },
  { content: 'Respiratory',              client_needs: 'Physiological Integrity' },
  { content: 'Neurological',             client_needs: 'Physiological Integrity' },
  { content: 'Endocrine',                client_needs: 'Physiological Integrity' },
  { content: 'OB / Maternity',           client_needs: 'Physiological Integrity' },
  { content: 'Therapeutic Communication',client_needs: 'Psychosocial Integrity' },
];

const NCJMM_STEPS = [
  'Recognize Cues',
  'Analyze Cues',
  'Prioritize Hypotheses',
  'Generate Solutions',
  'Take Action',
  'Evaluate Outcomes',
];

const SYSTEM_PROMPT = `You are an expert NCLEX-RN item writer. Generate ORIGINAL clinical-judgment items aligned to the 2026 NCSBN test plan and the NCJMM. Do not reproduce items from any commercial question bank. Every scenario and question must be your own.

Each item must include:
- a realistic vignette (3–5 sentences, no PHI),
- vitals as a JSON object with keys BP, HR, RR, SpO2, Temp (use realistic numbers/strings; include the SpO2 % sign and units like '98.6 F'),
- optional labs as a JSON object,
- a single best multiple-choice question (4 options labeled A–D),
- the correct option id,
- a tight, supportive 2–3 sentence rationale that is safe for a learner.

Vary client ages, settings (med-surg, ED, ICU, OB, peds, mental health), and difficulty. Avoid the same vignette twice.

Return ONLY valid JSON with shape:
{
  "items": [
    {
      "vignette": "...",
      "vitals": { "BP": "...", "HR": ..., "RR": ..., "SpO2": "...", "Temp": "..." },
      "labs": { ... } | {},
      "client_type": "Adult Med-Surg" | "Pediatric" | "Maternity" | "Mental Health" | "ICU" | "ED",
      "question_text": "...",
      "options": [
        { "id": "A", "text": "..." },
        { "id": "B", "text": "..." },
        { "id": "C", "text": "..." },
        { "id": "D", "text": "..." }
      ],
      "correct_option_id": "A" | "B" | "C" | "D",
      "difficulty_level": 1 | 2 | 3
    }
  ]
}`;

function userPrompt(contentArea, ncjmm, n) {
  return `Generate ${n} original NCLEX-style items.
Content area: ${contentArea}
NCJMM step: ${ncjmm}
Every question must clearly test the "${ncjmm}" cognitive operation in the context of "${contentArea}".`;
}

async function callOpenAI(contentArea, ncjmm, n) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.8,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt(contentArea, ncjmm, n) },
      ],
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('OpenAI returned no content');
  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed.items)) throw new Error('OpenAI JSON missing "items" array');
  return parsed.items;
}

function validItem(item) {
  return (
    item &&
    typeof item.vignette === 'string' && item.vignette.length > 40 &&
    item.vitals && typeof item.vitals === 'object' &&
    typeof item.client_type === 'string' &&
    typeof item.question_text === 'string' && item.question_text.length > 10 &&
    Array.isArray(item.options) && item.options.length >= 3 &&
    item.options.every((o) => typeof o.id === 'string' && typeof o.text === 'string') &&
    typeof item.correct_option_id === 'string' &&
    item.options.some((o) => o.id === item.correct_option_id)
  );
}

async function insertBatch(supabase, items, contentArea, ncjmm, clientNeeds) {
  let inserted = 0;
  for (const item of items) {
    if (!validItem(item)) {
      console.warn(`  skipped: invalid item`);
      continue;
    }
    const { data: scenario, error: sErr } = await supabase
      .from('clinical_scenarios')
      .insert({
        vignette: item.vignette,
        vitals: item.vitals,
        labs: item.labs && Object.keys(item.labs).length > 0 ? item.labs : {},
        client_type: item.client_type,
        client_needs_category: clientNeeds,
        content_area: contentArea,
      })
      .select('id')
      .single();
    if (sErr) {
      console.warn(`  scenario insert failed: ${sErr.message}`);
      continue;
    }
    const { error: qErr } = await supabase.from('questions').insert({
      scenario_id: scenario.id,
      question_text: item.question_text,
      question_type: 'multiple_choice',
      options: item.options,
      correct_option_ids: [item.correct_option_id],
      ncjmm_category: ncjmm,
      difficulty_level: Number.isInteger(item.difficulty_level) ? item.difficulty_level : 2,
    });
    if (qErr) {
      console.warn(`  question insert failed: ${qErr.message}`);
      continue;
    }
    inserted += 1;
  }
  return inserted;
}

function parseCombos() {
  const raw = process.env.SEED_COMBOS;
  if (!raw || raw === 'all') {
    const combos = [];
    for (const c of CONTENT_AREAS) {
      for (const n of NCJMM_STEPS) combos.push({ ...c, ncjmm: n });
    }
    return combos;
  }
  return raw.split(',').map((pair) => {
    const [content, ncjmm] = pair.split(':').map((s) => s.trim());
    const found = CONTENT_AREAS.find((c) => c.content === content);
    if (!found) throw new Error(`Unknown content area: ${content}`);
    if (!NCJMM_STEPS.includes(ncjmm)) throw new Error(`Unknown NCJMM step: ${ncjmm}`);
    return { ...found, ncjmm };
  });
}

async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false },
  });
  const combos = parseCombos();
  console.log(
    `Generating ${PER_COMBO} items × ${combos.length} combos = ${PER_COMBO * combos.length} target items (model: ${MODEL}).`
  );

  let totalInserted = 0;
  let i = 0;
  for (const combo of combos) {
    i += 1;
    const tag = `[${i}/${combos.length}] ${combo.content} · ${combo.ncjmm}`;
    try {
      console.log(`${tag} — calling OpenAI…`);
      const items = await callOpenAI(combo.content, combo.ncjmm, PER_COMBO);
      const n = await insertBatch(
        supabase,
        items,
        combo.content,
        combo.ncjmm,
        combo.client_needs
      );
      totalInserted += n;
      console.log(`  inserted ${n}/${items.length}`);
    } catch (err) {
      console.warn(`  failed: ${err.message}`);
    }
  }

  console.log(`\nDone. Inserted ${totalInserted} new items.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

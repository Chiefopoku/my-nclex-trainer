// Edge function: generate one fresh NCLEX-style scenario + question and insert it
// into Supabase. Called from the dashboard when the student wants a new question
// for a given content_area / ncjmm_category combination.
//
// Body: { contentArea: string, ncjmmCategory: string }
// Returns: { questionId: string }

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CLIENT_NEEDS_BY_CONTENT: Record<string, string> = {
  Cardiovascular: 'Physiological Integrity',
  Respiratory: 'Physiological Integrity',
  Neurological: 'Physiological Integrity',
  Endocrine: 'Physiological Integrity',
  'OB / Maternity': 'Physiological Integrity',
  'Therapeutic Communication': 'Psychosocial Integrity',
};

const SYSTEM_PROMPT = `You are an expert NCLEX-RN item writer. Generate an ORIGINAL clinical-judgment item aligned to the 2026 NCSBN test plan and the NCJMM. Do not reproduce items from any commercial question bank. The scenario and question must be your own.

Include:
- a realistic vignette (3-5 sentences, no PHI),
- vitals as a JSON object with keys BP, HR, RR, SpO2, Temp (realistic numbers/strings; include % on SpO2 and units like '98.6 F'),
- optional labs as a JSON object,
- a single best multiple-choice question (4 options labeled A-D),
- the correct option id,
- a difficulty_level 1-3.

Return ONLY valid JSON with shape:
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
}`;

interface GeneratedItem {
  vignette: string;
  vitals: Record<string, unknown>;
  labs?: Record<string, unknown>;
  client_type: string;
  question_text: string;
  options: { id: string; text: string }[];
  correct_option_id: string;
  difficulty_level?: number;
}

function isValid(item: GeneratedItem): boolean {
  return (
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { contentArea, ncjmmCategory } = await req.json();
    if (!contentArea || !ncjmmCategory) {
      throw new Error('contentArea and ncjmmCategory required');
    }
    const clientNeeds =
      CLIENT_NEEDS_BY_CONTENT[contentArea] ?? 'Physiological Integrity';

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) throw new Error('OPENAI_API_KEY not set');

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.85,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Content area: ${contentArea}\nNCJMM step: ${ncjmmCategory}\nThe question must clearly test the "${ncjmmCategory}" cognitive operation in the context of "${contentArea}".`,
          },
        ],
      }),
    });

    if (!aiRes.ok) {
      const t = await aiRes.text();
      throw new Error(`OpenAI ${aiRes.status}: ${t.slice(0, 300)}`);
    }

    const aiData = await aiRes.json();
    const text = aiData.choices?.[0]?.message?.content;
    if (!text) throw new Error('OpenAI returned no content');
    const item = JSON.parse(text) as GeneratedItem;
    if (!isValid(item)) throw new Error('AI returned an invalid item shape');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

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
    if (sErr) throw new Error(`scenario insert failed: ${sErr.message}`);

    const { data: question, error: qErr } = await supabase
      .from('questions')
      .insert({
        scenario_id: scenario.id,
        question_text: item.question_text,
        question_type: 'multiple_choice',
        options: item.options,
        correct_option_ids: [item.correct_option_id],
        ncjmm_category: ncjmmCategory,
        difficulty_level: Number.isInteger(item.difficulty_level)
          ? item.difficulty_level
          : 2,
      })
      .select('id')
      .single();
    if (qErr) throw new Error(`question insert failed: ${qErr.message}`);

    return new Response(JSON.stringify({ questionId: question.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { studentId, questionId } = body;
    // Accept either a single id (legacy multiple_choice) or an array (SATA).
    const selectedAnswerIds: string[] = Array.isArray(body.selectedAnswerIds)
      ? body.selectedAnswerIds
      : body.selectedAnswerId
        ? [body.selectedAnswerId]
        : [];

    // 1. Initialize DB internal client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 2. Fetch the question details
    const { data: question, error: qError } = await supabaseClient
      .from('questions')
      .select('*, clinical_scenarios(*)')
      .eq('id', questionId)
      .single();

    if (qError || !question) throw new Error('Question context not found');

    const correct: string[] = question.correct_option_ids ?? [];
    const isCorrect =
      correct.length === selectedAnswerIds.length &&
      correct.every((id: string) => selectedAnswerIds.includes(id));

    // 3. Prompt the AI Evaluator Agent to construct the clinical rationale
    const openAiApiKey = Deno.env.get('OPENAI_API_KEY');
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert NCLEX Nursing Preceptor evaluating a student's answer.
                     Provide a concise, highly supportive rationale explaining the clinical reality of their selection.
                     Format the response as clean JSON matching keys: "personalizedRationale" and "clinicalInsight".`,
          },
          {
            role: 'user',
            content: `Scenario: ${question.clinical_scenarios.vignette}.
                     Vitals: ${JSON.stringify(question.clinical_scenarios.vitals)}.
                     Question Asked: ${question.question_text}.
                     Student selected: ${selectedAnswerIds.join(', ')}. Is Correct: ${isCorrect}.
                     Correct Answer was: ${correct.join(', ')}.`,
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    const aiData = await aiResponse.json();
    const parsedAgentOutput = JSON.parse(aiData.choices[0].message.content);

    // 4. Async track response history to database
    await supabaseClient.from('student_responses').insert({
      student_id: studentId,
      question_id: questionId,
      selected_option_ids: selectedAnswerIds,
      is_correct: isCorrect,
    });

    return new Response(
      JSON.stringify({ isCorrect, ...parsedAgentOutput }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

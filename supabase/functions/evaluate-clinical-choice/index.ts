// Edge function: grade a student's answer, save it, and ask the AI preceptor
// for a rationale. The student is identified from their Supabase session
// (anonymous or signed-in), never from the request body.
//
// Body: { questionId: string, selectedAnswerIds: string[] }
// Returns: { isCorrect, correctOptionIds, personalizedRationale, clinicalInsight }

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const questionId: string | undefined = body.questionId;
    const selectedAnswerIds: string[] = Array.isArray(body.selectedAnswerIds)
      ? body.selectedAnswerIds.map(String).slice(0, 10)
      : body.selectedAnswerId
        ? [String(body.selectedAnswerId)]
        : [];
    if (!questionId || selectedAnswerIds.length === 0) {
      return json({ error: "questionId and selectedAnswerIds are required" }, 400);
    }

    const url = Deno.env.get("SUPABASE_URL") ?? "";
    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");

    // Who is answering? Taken from the caller's JWT.
    let studentId: string | null = null;
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (token) {
      const { data } = await admin.auth.getUser(token);
      studentId = data.user?.id ?? null;
    }

    const { data: question, error: qError } = await admin
      .from("questions")
      .select("*, clinical_scenarios(*)")
      .eq("id", questionId)
      .single();
    if (qError || !question) return json({ error: "Question not found" }, 404);

    const correct: string[] = question.correct_option_ids ?? [];
    const isCorrect =
      correct.length === selectedAnswerIds.length &&
      correct.every((id: string) => selectedAnswerIds.includes(id));

    // Save the attempt first, so progress is recorded even if the AI call fails.
    if (studentId) {
      await admin.from("student_profiles").upsert({ id: studentId }, { onConflict: "id", ignoreDuplicates: true });
      await admin.from("student_responses").insert({
        student_id: studentId,
        question_id: questionId,
        selected_option_ids: selectedAnswerIds,
        is_correct: isCorrect,
      });
    }

    const optionText = (ids: string[]) =>
      (question.options as { id: string; text: string }[])
        .filter((o) => ids.includes(o.id))
        .map((o) => `${o.id}. ${o.text}`)
        .join("; ");

    const fallback = {
      personalizedRationale: isCorrect
        ? "Correct."
        : `Not quite. The correct answer: ${optionText(correct)}.`,
      clinicalInsight: "The AI preceptor's detailed rationale isn't available right now.",
    };

    const openAiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAiApiKey) return json({ isCorrect, correctOptionIds: correct, ...fallback });

    try {
      const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.4,
          max_tokens: 450,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                'You are an expert, supportive NCLEX-RN preceptor. Explain the clinical reasoning behind the correct answer and, if the student was wrong, why their choice is less safe. Be accurate, concise (under 120 words total) and use US nursing standards. Return JSON with keys "personalizedRationale" and "clinicalInsight" (one memorable clinical pearl).',
            },
            {
              role: "user",
              content: `Scenario: ${question.clinical_scenarios?.vignette}
Vitals: ${JSON.stringify(question.clinical_scenarios?.vitals)}
Labs: ${JSON.stringify(question.clinical_scenarios?.labs ?? {})}
Question: ${question.question_text}
Options: ${optionText((question.options as { id: string }[]).map((o) => o.id))}
Student selected: ${optionText(selectedAnswerIds)}
Correct answer: ${optionText(correct)}
Student was ${isCorrect ? "correct" : "incorrect"}.`,
            },
          ],
        }),
      });
      if (!aiResponse.ok) throw new Error(`OpenAI ${aiResponse.status}`);
      const aiData = await aiResponse.json();
      const parsed = JSON.parse(aiData.choices?.[0]?.message?.content ?? "{}");
      return json({
        isCorrect,
        correctOptionIds: correct,
        personalizedRationale:
          typeof parsed.personalizedRationale === "string" ? parsed.personalizedRationale : fallback.personalizedRationale,
        clinicalInsight:
          typeof parsed.clinicalInsight === "string" ? parsed.clinicalInsight : fallback.clinicalInsight,
      });
    } catch {
      return json({ isCorrect, correctOptionIds: correct, ...fallback });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return json({ error: message }, 400);
  }
});

"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupabaseClient, getStudentId } from "@/utils/supabaseClient";
import { DEMO_QUESTIONS, type DemoQuestion } from "@/utils/demoData";
import ClinicalVignette from "@/components/ClinicalVignette";
import QuestionBlock from "@/components/QuestionBlock";

interface Scenario {
  id: string;
  vignette: string;
  vitals: Record<string, unknown>;
  labs: Record<string, unknown> | null;
  client_type: string;
  client_needs_category?: string | null;
  content_area?: string | null;
}

interface QuestionOption {
  id: string;
  text: string;
}

interface Question {
  id: string;
  scenario_id: string;
  question_text: string;
  question_type: string;
  options: QuestionOption[];
  correct_option_ids?: string[];
  ncjmm_category: string;
  difficulty_level: number;
  clinical_scenarios: Scenario;
}

interface EvaluationResult {
  isCorrect: boolean;
  personalizedRationale: string;
  clinicalInsight: string;
  correctOptionIds: string[];
}

const CONTENT_AREA_OPTIONS = [
  "Cardiovascular",
  "Respiratory",
  "Neurological",
  "Endocrine",
  "OB / Maternity",
  "Therapeutic Communication",
];

const NCJMM_OPTIONS = [
  "Recognize Cues",
  "Analyze Cues",
  "Prioritize Hypotheses",
  "Generate Solutions",
  "Take Action",
  "Evaluate Outcomes",
];

const sameSet = (a: string[], b: string[]) =>
  a.length === b.length && a.every((id) => b.includes(id));

function demoQuestionToQuestion(q: DemoQuestion): Question {
  return {
    id: q.id,
    scenario_id: `scenario-${q.id}`,
    question_text: q.question_text,
    question_type: q.question_type,
    options: q.options,
    correct_option_ids: q.correct_option_ids,
    ncjmm_category: q.ncjmm_category,
    difficulty_level: 2,
    clinical_scenarios: {
      id: `scenario-${q.id}`,
      vignette: q.scenario.vignette,
      vitals: q.scenario.vitals as Record<string, unknown>,
      labs: (q.scenario.labs ?? null) as Record<string, unknown> | null,
      client_type: q.scenario.client_type,
      client_needs_category: q.scenario.client_needs_category,
      content_area: q.scenario.content_area,
    },
  };
}

function gradeDemoAnswer(q: DemoQuestion, selectedIds: string[]): EvaluationResult {
  const isCorrect = sameSet(q.correct_option_ids, selectedIds);
  return {
    isCorrect,
    personalizedRationale: isCorrect ? q.rationale.correct : q.rationale.incorrect,
    clinicalInsight: q.rationale.insight,
    correctOptionIds: q.correct_option_ids,
  };
}

export default function DashboardPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [demoQuestion, setDemoQuestion] = useState<DemoQuestion | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [session, setSession] = useState({ answered: 0, correct: 0 });

  const [contentFilter, setContentFilter] = useState<string>("");
  const [ncjmmFilter, setNcjmmFilter] = useState<string>("");
  const [generating, setGenerating] = useState(false);

  const pickDemoQuestion = useCallback((content: string, ncjmm: string) => {
    const pool = DEMO_QUESTIONS.filter(
      (q) =>
        (content === "" || q.scenario.content_area === content) &&
        (ncjmm === "" || q.ncjmm_category === ncjmm),
    );
    if (pool.length === 0) {
      setQuestion(null);
      setDemoQuestion(null);
      setError("No questions match this filter. Try clearing one.");
      setLoadingQuestion(false);
      return;
    }
    const next = pool[Math.floor(Math.random() * pool.length)];
    setDemoQuestion(next);
    setQuestion(demoQuestionToQuestion(next));
    setDemoMode(true);
    setLoadingQuestion(false);
  }, []);

  const loadNextQuestion = useCallback(async () => {
    setLoadingQuestion(true);
    setResult(null);
    setError(null);
    setNotice(null);

    const supabase = getSupabaseClient();
    if (!supabase) {
      pickDemoQuestion(contentFilter, ncjmmFilter);
      return;
    }

    // content_area lives on clinical_scenarios, so filter through an inner join.
    const useInner = Boolean(contentFilter);
    let query = supabase
      .from("questions")
      .select(useInner ? "*, clinical_scenarios!inner(*)" : "*, clinical_scenarios(*)");

    if (contentFilter) query = query.eq("clinical_scenarios.content_area", contentFilter);
    if (ncjmmFilter) query = query.eq("ncjmm_category", ncjmmFilter);

    const { data, error: qError } = await query.limit(60);

    if (qError) {
      pickDemoQuestion(contentFilter, ncjmmFilter);
      setNotice("We couldn't reach the question bank, so here's a built-in practice question.");
      return;
    }

    if (!data || data.length === 0) {
      setQuestion(null);
      setDemoQuestion(null);
      setDemoMode(false);
      setLoadingQuestion(false);
      setError("No questions match this filter yet. Try clearing one.");
      return;
    }

    const rows = data as unknown as Question[];
    const pool = rows.filter((q) => q.id !== question?.id);
    const list = pool.length > 0 ? pool : rows;
    setQuestion(list[Math.floor(Math.random() * list.length)]);
    setDemoQuestion(null);
    setDemoMode(false);
    setLoadingQuestion(false);
    // question?.id is intentionally read without being a dependency: we only
    // want to avoid repeating the current question, not reload when it changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentFilter, ncjmmFilter, pickDemoQuestion]);

  useEffect(() => {
    loadNextQuestion();
  }, [loadNextQuestion]);

  // Start the private guest session early so the first answer is saved.
  useEffect(() => {
    getStudentId();
  }, []);

  const handleGenerate = async () => {
    if (!contentFilter || !ncjmmFilter) {
      setError("Pick a content area and an NCJMM step before generating.");
      return;
    }
    const supabase = getSupabaseClient();
    if (!supabase) return;

    setGenerating(true);
    setResult(null);
    setError(null);
    setNotice(null);
    await getStudentId();

    const { data, error: fnError } = await supabase.functions.invoke("generate-scenario", {
      body: { contentArea: contentFilter, ncjmmCategory: ncjmmFilter },
    });

    const newId = (data as { questionId?: string } | null)?.questionId;
    if (fnError || !newId) {
      setError(
        "The AI couldn't write a new scenario right now (it may have hit its hourly limit). Try again later, or keep practising from the bank.",
      );
      setGenerating(false);
      return;
    }

    const { data: row, error: qError } = await supabase
      .from("questions")
      .select("*, clinical_scenarios(*)")
      .eq("id", newId)
      .single();

    if (qError || !row) {
      setError("The new scenario was created but couldn't be loaded. Try Next scenario.");
      setGenerating(false);
      return;
    }

    setQuestion(row as unknown as Question);
    setDemoQuestion(null);
    setDemoMode(false);
    setGenerating(false);
  };

  const recordResult = (r: EvaluationResult) => {
    setResult(r);
    setSession((s) => ({ answered: s.answered + 1, correct: s.correct + (r.isCorrect ? 1 : 0) }));
  };

  const handleSubmit = async (selectedIds: string[]) => {
    if (!question) return;
    setSubmitting(true);
    setError(null);

    if (demoMode && demoQuestion) {
      recordResult(gradeDemoAnswer(demoQuestion, selectedIds));
      setSubmitting(false);
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setSubmitting(false);
      return;
    }

    const studentId = await getStudentId();
    const { data, error: fnError } = await supabase.functions.invoke("evaluate-clinical-choice", {
      body: { questionId: question.id, selectedAnswerIds: selectedIds },
    });

    const evaluated = data as Partial<EvaluationResult> | null;
    if (!fnError && evaluated && typeof evaluated.isCorrect === "boolean") {
      recordResult({
        isCorrect: evaluated.isCorrect,
        personalizedRationale: evaluated.personalizedRationale ?? "",
        clinicalInsight: evaluated.clinicalInsight ?? "",
        correctOptionIds: evaluated.correctOptionIds ?? question.correct_option_ids ?? [],
      });
      setSubmitting(false);
      return;
    }

    // AI preceptor unavailable: grade locally and still save the attempt.
    const correct = question.correct_option_ids ?? [];
    const isCorrect = sameSet(correct, selectedIds);
    if (studentId) {
      await supabase.from("student_responses").insert({
        student_id: studentId,
        question_id: question.id,
        selected_option_ids: selectedIds,
        is_correct: isCorrect,
      });
    }
    const correctText = question.options
      .filter((o) => correct.includes(o.id))
      .map((o) => `${o.id}. ${o.text}`)
      .join("; ");
    recordResult({
      isCorrect,
      personalizedRationale: isCorrect
        ? "Correct."
        : `Not quite. The correct answer: ${correctText}.`,
      clinicalInsight: "The AI preceptor's detailed rationale isn't available right now.",
      correctOptionIds: correct,
    });
    setSubmitting(false);
  };

  const busy = loadingQuestion || submitting || generating;
  const accuracy = session.answered ? Math.round((session.correct / session.answered) * 100) : 0;

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8 sm:py-10">
      <div className="max-w-2xl w-full flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Clinical Judgment Practice
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              One scenario at a time. Pick the safest action.
            </p>
          </div>
          {session.answered > 0 && (
            <div
              className="text-xs font-medium bg-white border border-stone-200 rounded-full px-3 py-1.5 text-slate-600 shadow-sm"
              aria-live="polite"
            >
              This session: <span className="text-slate-900">{session.correct}/{session.answered}</span> · {accuracy}%
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
          <FilterSelect label="Content area" value={contentFilter} options={CONTENT_AREA_OPTIONS} onChange={setContentFilter} />
          <FilterSelect label="NCJMM step" value={ncjmmFilter} options={NCJMM_OPTIONS} onChange={setNcjmmFilter} />
          {!demoMode && (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={busy || !contentFilter || !ncjmmFilter}
              title={!contentFilter || !ncjmmFilter ? "Pick a content area and an NCJMM step first." : "Have the AI write a fresh scenario."}
              className="h-[42px] text-sm font-medium px-4 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:border-stone-200 disabled:bg-stone-50 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {generating ? "Writing…" : "✨ New AI scenario"}
            </button>
          )}
        </div>

        {demoMode && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-sm">
            <strong>Practice mode.</strong> You&apos;re using the built-in question set with
            written rationales. Progress isn&apos;t saved in this mode.
          </div>
        )}

        {notice && (
          <div className="bg-sky-50 border border-sky-200 text-sky-900 rounded-xl p-3 text-sm">{notice}</div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-xl p-4 text-sm" role="alert">
            {error}
          </div>
        )}

        {(loadingQuestion || generating) && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 text-slate-500 animate-pulse">
            {generating ? "The AI is writing a new scenario…" : "Loading scenario…"}
          </div>
        )}

        {question && !loadingQuestion && !generating && (
          <>
            <ClinicalVignette
              clientType={question.clinical_scenarios.client_type}
              vignette={question.clinical_scenarios.vignette}
              vitals={question.clinical_scenarios.vitals}
              labs={question.clinical_scenarios.labs ?? undefined}
            />

            <div className="w-full">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">NCJMM step</span>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-full px-2.5 py-0.5">
                  {question.ncjmm_category}
                </span>
                {question.clinical_scenarios.content_area && (
                  <span className="text-xs font-medium text-slate-600 bg-stone-100 rounded-full px-2.5 py-0.5">
                    {question.clinical_scenarios.content_area}
                  </span>
                )}
              </div>
              <QuestionBlock
                key={question.id}
                questionText={question.question_text}
                options={question.options}
                multiSelect={question.question_type === "select_all"}
                onSubmit={handleSubmit}
                isLoading={submitting}
                revealedCorrectIds={result ? result.correctOptionIds : null}
              />
            </div>

            {result && (
              <div
                className={`w-full rounded-2xl border p-5 sm:p-6 shadow-sm ${
                  result.isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"
                }`}
                aria-live="polite"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-sm ${
                      result.isCorrect ? "bg-emerald-600" : "bg-amber-600"
                    }`}
                  >
                    {result.isCorrect ? "✓" : "!"}
                  </span>
                  <h3 className={`text-lg font-semibold tracking-tight ${result.isCorrect ? "text-emerald-900" : "text-amber-900"}`}>
                    {result.isCorrect ? "Correct — well done." : "Not quite."}
                  </h3>
                </div>
                {result.personalizedRationale && (
                  <p className="text-slate-800 mb-4 leading-relaxed">{result.personalizedRationale}</p>
                )}
                {result.clinicalInsight && (
                  <div className="border-t border-black/5 pt-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Clinical insight</div>
                    <p className="text-slate-700 text-sm leading-relaxed">{result.clinicalInsight}</p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={loadNextQuestion}
                  className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl transition-colors"
                >
                  Next scenario <span aria-hidden>→</span>
                </button>
              </div>
            )}

            {!result && (
              <button
                type="button"
                onClick={loadNextQuestion}
                disabled={busy}
                className="self-end text-sm text-indigo-700 hover:text-indigo-900 font-medium disabled:text-slate-400"
              >
                Skip this one →
              </button>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col text-sm">
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[42px] bg-white border border-stone-200 rounded-xl px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 cursor-pointer"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

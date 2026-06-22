'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabaseClient } from '@/utils/supabaseClient';
import { DEMO_QUESTIONS, type DemoQuestion } from '@/utils/demoData';
import ClinicalVignette from '@/components/ClinicalVignette';
import QuestionBlock from '@/components/QuestionBlock';

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
}

const DEMO_STUDENT_ID = '00000000-0000-0000-0000-000000000001';

const CONTENT_AREA_OPTIONS = [
  'Cardiovascular',
  'Respiratory',
  'Neurological',
  'Endocrine',
  'OB / Maternity',
  'Therapeutic Communication',
];

const NCJMM_OPTIONS = [
  'Recognize Cues',
  'Analyze Cues',
  'Prioritize Hypotheses',
  'Generate Solutions',
  'Take Action',
  'Evaluate Outcomes',
];

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

function gradeDemoAnswer(
  q: DemoQuestion,
  selectedIds: string[]
): EvaluationResult {
  const correct = q.correct_option_ids;
  const isCorrect =
    correct.length === selectedIds.length &&
    correct.every((id) => selectedIds.includes(id));
  return {
    isCorrect,
    personalizedRationale: isCorrect ? q.rationale.correct : q.rationale.incorrect,
    clinicalInsight: q.rationale.insight,
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

  const [contentFilter, setContentFilter] = useState<string>('');
  const [ncjmmFilter, setNcjmmFilter] = useState<string>('');
  const [generating, setGenerating] = useState(false);

  const pickDemoQuestion = useCallback(
    (content: string, ncjmm: string) => {
      const pool = DEMO_QUESTIONS.filter(
        (q) =>
          (content === '' || q.scenario.content_area === content) &&
          (ncjmm === '' || q.ncjmm_category === ncjmm)
      );
      if (pool.length === 0) {
        setQuestion(null);
        setDemoQuestion(null);
        setError('No questions match this filter. Try clearing one.');
        setLoadingQuestion(false);
        return;
      }
      const next = pool[Math.floor(Math.random() * pool.length)];
      setDemoQuestion(next);
      setQuestion(demoQuestionToQuestion(next));
      setDemoMode(true);
      setLoadingQuestion(false);
    },
    []
  );

  const loadNextQuestion = useCallback(async () => {
    setLoadingQuestion(true);
    setResult(null);
    setError(null);

    const supabase = getSupabaseClient();
    if (!supabase) {
      pickDemoQuestion(contentFilter, ncjmmFilter);
      return;
    }

    // For content_area (lives on clinical_scenarios) we need an inner join + filter on the
    // embedded resource. PostgREST supports that with !inner and the embed.column path.
    const useInner = Boolean(contentFilter);
    let query = supabase
      .from('questions')
      .select(
        useInner ? '*, clinical_scenarios!inner(*)' : '*, clinical_scenarios(*)'
      );

    if (contentFilter) {
      query = query.eq('clinical_scenarios.content_area', contentFilter);
    }
    if (ncjmmFilter) {
      query = query.eq('ncjmm_category', ncjmmFilter);
    }

    const { data, error: qError } = await query.limit(40);

    if (qError) {
      pickDemoQuestion(contentFilter, ncjmmFilter);
      setError(`Showing demo question. Supabase error: ${qError.message}`);
      return;
    }

    if (!data || data.length === 0) {
      setQuestion(null);
      setDemoQuestion(null);
      setDemoMode(false);
      setLoadingQuestion(false);
      setError('No questions match this filter. Try clearing one.');
      return;
    }

    const next = data[Math.floor(Math.random() * data.length)] as Question;
    setQuestion(next);
    setDemoQuestion(null);
    setDemoMode(false);
    setLoadingQuestion(false);
  }, [contentFilter, ncjmmFilter, pickDemoQuestion]);

  useEffect(() => {
    loadNextQuestion();
  }, [loadNextQuestion]);

  const handleGenerate = async () => {
    if (!contentFilter || !ncjmmFilter) {
      setError('Pick a content area and an NCJMM step before generating.');
      return;
    }
    const supabase = getSupabaseClient();
    if (!supabase) {
      setError('Supabase is required to generate new scenarios.');
      return;
    }

    setGenerating(true);
    setResult(null);
    setError(null);

    const { data, error: fnError } = await supabase.functions.invoke(
      'generate-scenario',
      {
        body: { contentArea: contentFilter, ncjmmCategory: ncjmmFilter },
      }
    );

    if (fnError) {
      setError(`Generation failed: ${fnError.message}`);
      setGenerating(false);
      return;
    }

    const newId = (data as { questionId?: string })?.questionId;
    if (!newId) {
      setError('Generation returned no question id.');
      setGenerating(false);
      return;
    }

    const { data: row, error: qError } = await supabase
      .from('questions')
      .select('*, clinical_scenarios(*)')
      .eq('id', newId)
      .single();

    if (qError || !row) {
      setError(qError?.message ?? 'Could not load the generated question.');
      setGenerating(false);
      return;
    }

    setQuestion(row as Question);
    setDemoQuestion(null);
    setDemoMode(false);
    setGenerating(false);
  };

  const handleSubmit = async (selectedIds: string[]) => {
    if (!question) return;
    setSubmitting(true);
    setError(null);

    if (demoMode && demoQuestion) {
      setResult(gradeDemoAnswer(demoQuestion, selectedIds));
      setSubmitting(false);
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setSubmitting(false);
      return;
    }

    const { data, error: fnError } = await supabase.functions.invoke(
      'evaluate-clinical-choice',
      {
        body: {
          studentId: DEMO_STUDENT_ID,
          questionId: question.id,
          selectedAnswerIds: selectedIds,
        },
      }
    );

    if (fnError) {
      // Edge function not deployed (or errored) — grade locally so the UI still works.
      const correct = question.correct_option_ids ?? [];
      const isCorrect =
        correct.length === selectedIds.length &&
        correct.every((id) => selectedIds.includes(id));

      // Still log the response so /progress can count it, even without AI rationale.
      await supabase.from('student_responses').insert({
        student_id: DEMO_STUDENT_ID,
        question_id: question.id,
        selected_option_ids: selectedIds,
        is_correct: isCorrect,
      });

      setResult({
        isCorrect,
        personalizedRationale: isCorrect
          ? 'Correct.'
          : `Not quite. The correct answer was ${correct.join(', ')}.`,
        clinicalInsight:
          'AI rationale unavailable — deploy the evaluate-clinical-choice edge function and set OPENAI_API_KEY to enable preceptor feedback.',
      });
    } else {
      setResult(data as EvaluationResult);
    }
    setSubmitting(false);
  };

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-10 gap-6">
      <div className="max-w-2xl w-full flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Clinical Judgment Practice
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            One scenario at a time — pick the safest action.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleGenerate}
            disabled={
              generating || loadingQuestion || submitting || demoMode ||
              !contentFilter || !ncjmmFilter
            }
            title={
              demoMode
                ? 'Connect Supabase to generate scenarios.'
                : !contentFilter || !ncjmmFilter
                  ? 'Pick a content area and an NCJMM step first.'
                  : 'Have the AI write you a fresh scenario.'
            }
            className="text-sm font-medium px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:border-stone-200 disabled:bg-stone-50 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            {generating ? 'Generating…' : '✨ Generate'}
          </button>
          <button
            onClick={loadNextQuestion}
            disabled={loadingQuestion || submitting || generating}
            className="text-sm text-indigo-700 hover:text-indigo-900 font-medium disabled:text-slate-400 flex items-center gap-1"
          >
            Next Scenario
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FilterSelect
          label="Content area"
          value={contentFilter}
          options={CONTENT_AREA_OPTIONS}
          onChange={setContentFilter}
        />
        <FilterSelect
          label="NCJMM step"
          value={ncjmmFilter}
          options={NCJMM_OPTIONS}
          onChange={setNcjmmFilter}
        />
      </div>

      {demoMode && (
        <div className="max-w-2xl w-full bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-sm">
          <strong>Demo mode.</strong> You&apos;re seeing built-in scenarios with canned rationales.
          To get the AI preceptor and adaptive scoring, connect Supabase (set{' '}
          <code className="px-1 py-0.5 rounded bg-amber-100">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
          <code className="px-1 py-0.5 rounded bg-amber-100">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{' '}
          <code className="px-1 py-0.5 rounded bg-amber-100">.env.local</code>, run{' '}
          <code className="px-1 py-0.5 rounded bg-amber-100">schema.sql</code> +{' '}
          <code className="px-1 py-0.5 rounded bg-amber-100">seed.sql</code>, and deploy the edge function).
        </div>
      )}

      {error && (
        <div className="max-w-2xl w-full bg-rose-50 border border-rose-200 text-rose-900 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      {loadingQuestion && (
        <div className="max-w-2xl w-full bg-white border border-stone-200 rounded-2xl p-6 text-slate-500">
          Loading scenario…
        </div>
      )}

      {question && !loadingQuestion && (
        <>
          <ClinicalVignette
            clientType={question.clinical_scenarios.client_type}
            vignette={question.clinical_scenarios.vignette}
            vitals={question.clinical_scenarios.vitals}
            labs={question.clinical_scenarios.labs ?? undefined}
          />

          <div className="max-w-2xl w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                NCJMM Step
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-xs font-semibold text-indigo-700">
                {question.ncjmm_category}
              </span>
            </div>
            <QuestionBlock
              questionId={question.id}
              questionText={question.question_text}
              options={question.options}
              multiSelect={question.question_type === 'select_all'}
              onSubmit={handleSubmit}
              isLoading={submitting}
            />
          </div>

          {result && (
            <div
              className={`max-w-2xl w-full rounded-2xl border p-6 shadow-sm ${
                result.isCorrect
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-sm ${
                    result.isCorrect ? 'bg-emerald-600' : 'bg-amber-600'
                  }`}
                >
                  {result.isCorrect ? '✓' : '!'}
                </span>
                <h3
                  className={`text-lg font-semibold tracking-tight ${
                    result.isCorrect ? 'text-emerald-900' : 'text-amber-900'
                  }`}
                >
                  {result.isCorrect ? 'Correct — well done.' : 'Not quite.'}
                </h3>
              </div>
              <p className="text-slate-800 mb-4 leading-relaxed">
                {result.personalizedRationale}
              </p>
              <div className="border-t border-black/5 pt-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  Clinical Insight
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {result.clinicalInsight}
                </p>
              </div>
            </div>
          )}
        </>
      )}
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
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 cursor-pointer"
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

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

  const pickDemoQuestion = useCallback(() => {
    const next = DEMO_QUESTIONS[Math.floor(Math.random() * DEMO_QUESTIONS.length)];
    setDemoQuestion(next);
    setQuestion(demoQuestionToQuestion(next));
    setDemoMode(true);
    setLoadingQuestion(false);
  }, []);

  const loadNextQuestion = useCallback(async () => {
    setLoadingQuestion(true);
    setResult(null);
    setError(null);

    const supabase = getSupabaseClient();
    if (!supabase) {
      pickDemoQuestion();
      return;
    }

    const { data, error: qError } = await supabase
      .from('questions')
      .select('*, clinical_scenarios(*)')
      .limit(20);

    if (qError || !data || data.length === 0) {
      pickDemoQuestion();
      if (qError) {
        setError(`Showing demo question. Supabase error: ${qError.message}`);
      }
      return;
    }

    const next = data[Math.floor(Math.random() * data.length)] as Question;
    setQuestion(next);
    setDemoQuestion(null);
    setDemoMode(false);
    setLoadingQuestion(false);
  }, [pickDemoQuestion]);

  useEffect(() => {
    loadNextQuestion();
  }, [loadNextQuestion]);

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
      setError(fnError.message);
    } else {
      setResult(data as EvaluationResult);
    }
    setSubmitting(false);
  };

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-10 gap-6">
      <div className="max-w-2xl w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Clinical Judgment Practice</h1>
        <button
          onClick={loadNextQuestion}
          disabled={loadingQuestion || submitting}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400"
        >
          Next Scenario →
        </button>
      </div>

      {demoMode && (
        <div className="max-w-2xl w-full bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3 text-sm">
          <strong>Demo mode.</strong> You&apos;re seeing built-in scenarios with canned rationales.
          To get the AI preceptor and adaptive scoring, connect Supabase (set{' '}
          <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{' '}
          <code>.env.local</code>, run <code>schema.sql</code> + <code>seed.sql</code>, and deploy
          the edge function).
        </div>
      )}

      {error && (
        <div className="max-w-2xl w-full bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      {loadingQuestion && (
        <div className="max-w-2xl w-full bg-white border border-gray-100 rounded-xl p-6 text-gray-500">
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
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                NCJMM Step:
              </span>
              <span className="text-xs font-semibold text-gray-800">
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
              className={`max-w-2xl w-full rounded-xl border p-6 ${
                result.isCorrect
                  ? 'bg-green-50 border-green-200'
                  : 'bg-amber-50 border-amber-200'
              }`}
            >
              <h3
                className={`text-lg font-bold mb-2 ${
                  result.isCorrect ? 'text-green-900' : 'text-amber-900'
                }`}
              >
                {result.isCorrect ? 'Correct — well done.' : 'Not quite.'}
              </h3>
              <p className="text-gray-800 mb-3 leading-relaxed">
                {result.personalizedRationale}
              </p>
              <div className="border-t border-black/10 pt-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                  Clinical Insight
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
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

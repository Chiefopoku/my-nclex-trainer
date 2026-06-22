'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '@/utils/supabaseClient';

const DEMO_STUDENT_ID = '00000000-0000-0000-0000-000000000001';

interface RawResponse {
  is_correct: boolean;
  questions: {
    ncjmm_category: string;
    clinical_scenarios: {
      client_needs_category: string | null;
      content_area: string | null;
    } | null;
  } | null;
}

interface BreakdownRow {
  label: string;
  total: number;
  correct: number;
}

function aggregate(
  responses: RawResponse[],
  pick: (r: RawResponse) => string | null | undefined
): BreakdownRow[] {
  const map = new Map<string, BreakdownRow>();
  for (const r of responses) {
    const key = pick(r) ?? 'Uncategorized';
    const row = map.get(key) ?? { label: key, total: 0, correct: 0 };
    row.total += 1;
    if (r.is_correct) row.correct += 1;
    map.set(key, row);
  }
  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}

export default function ProgressPage() {
  const [responses, setResponses] = useState<RawResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [unconfigured, setUnconfigured] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setUnconfigured(true);
      return;
    }
    supabase
      .from('student_responses')
      .select(
        'is_correct, questions(ncjmm_category, clinical_scenarios(client_needs_category, content_area))'
      )
      .eq('student_id', DEMO_STUDENT_ID)
      .then(({ data, error: e }) => {
        if (e) setError(e.message);
        else setResponses((data ?? []) as unknown as RawResponse[]);
      });
  }, []);

  const stats = useMemo(() => {
    if (!responses) return null;
    const total = responses.length;
    const correct = responses.filter((r) => r.is_correct).length;
    return {
      total,
      correct,
      accuracy: total > 0 ? (correct / total) * 100 : 0,
      byNcjmm: aggregate(responses, (r) => r.questions?.ncjmm_category),
      byClientNeeds: aggregate(
        responses,
        (r) => r.questions?.clinical_scenarios?.client_needs_category
      ),
      byContentArea: aggregate(
        responses,
        (r) => r.questions?.clinical_scenarios?.content_area
      ),
    };
  }, [responses]);

  if (unconfigured) {
    return (
      <main className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
            Your Progress
          </h1>
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 text-sm">
            <strong>Demo mode.</strong> Progress only tracks once Supabase is connected.
            Connect your project (see <code className="px-1 py-0.5 rounded bg-amber-100">.env.local</code>)
            and the questions you answer will show up here.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">Your Progress</h1>
        <p className="text-slate-600 mb-6">
          Accuracy by clinical-judgment step, Client Needs category, and content area.
        </p>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-xl p-4 text-sm mb-6">
            {error}
          </div>
        )}

        {!responses && !error && <p className="text-slate-500">Loading…</p>}

        {stats && stats.total === 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl font-bold mb-3">
              ◌
            </div>
            <p className="text-slate-700 mb-1">No answered questions yet.</p>
            <p className="text-sm text-slate-500">
              Head to{' '}
              <Link href="/dashboard" className="text-indigo-700 hover:text-indigo-900 font-medium">
                Practice
              </Link>{' '}
              and submit a few — your stats will appear here.
            </p>
          </div>
        )}

        {stats && stats.total > 0 && (
          <>
            <section className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <SummaryCard label="Questions answered" value={stats.total.toString()} />
              <SummaryCard label="Correct" value={stats.correct.toString()} />
              <SummaryCard
                label="Overall accuracy"
                value={`${stats.accuracy.toFixed(0)}%`}
                accent={stats.accuracy >= 70}
              />
            </section>

            <BreakdownSection title="By NCJMM step" rows={stats.byNcjmm} />
            <BreakdownSection title="By Client Needs category" rows={stats.byClientNeeds} />
            <BreakdownSection title="By content area" rows={stats.byContentArea} />
          </>
        )}
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  const valueColor =
    accent === true
      ? 'text-emerald-700'
      : accent === false
        ? 'text-amber-700'
        : 'text-slate-900';
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
        {label}
      </div>
      <div className={`text-3xl font-semibold tracking-tight ${valueColor}`}>{value}</div>
    </div>
  );
}

function BreakdownSection({
  title,
  rows,
}: {
  title: string;
  rows: BreakdownRow[];
}) {
  if (rows.length === 0) return null;
  return (
    <section className="mb-8">
      <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
        {title}
      </h2>
      <div className="bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100 shadow-sm overflow-hidden">
        {rows.map((row) => {
          const pct = row.total > 0 ? (row.correct / row.total) * 100 : 0;
          const barColor =
            pct >= 80
              ? 'bg-emerald-500'
              : pct >= 60
                ? 'bg-indigo-500'
                : 'bg-amber-500';
          return (
            <div key={row.label} className="px-5 py-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-medium text-slate-900">{row.label}</span>
                <span className="text-xs text-slate-500 tabular-nums">
                  {row.correct}/{row.total} · {pct.toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${barColor} transition-[width] duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

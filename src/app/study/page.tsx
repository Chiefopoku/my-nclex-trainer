'use client';

import { useEffect, useMemo, useState } from 'react';
import { getSupabaseClient } from '@/utils/supabaseClient';
import { DEMO_STUDY_FACTS, type DemoStudyFact } from '@/utils/demoData';

const CATEGORY_ORDER = [
  'Golden Rules',
  'NCJMM',
  'Lab Values',
  'Antidotes',
  'Positions',
  'Isolation',
  'Communication',
];

export default function StudyPage() {
  const [facts, setFacts] = useState<DemoStudyFact[] | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setFacts(DEMO_STUDY_FACTS);
      setDemoMode(true);
      return;
    }
    supabase
      .from('study_facts')
      .select('*')
      .then(({ data, error: e }) => {
        if (e || !data || data.length === 0) {
          setFacts(DEMO_STUDY_FACTS);
          setDemoMode(true);
          if (e) setError(`Showing baked-in facts. Supabase error: ${e.message}`);
        } else {
          setFacts(data as DemoStudyFact[]);
        }
      });
  }, []);

  const grouped = useMemo(() => {
    if (!facts) return null;
    const q = query.trim().toLowerCase();
    const filtered = q
      ? facts.filter(
          (f) =>
            f.title.toLowerCase().includes(q) ||
            f.body.toLowerCase().includes(q) ||
            f.category.toLowerCase().includes(q) ||
            f.tags.some((t) => t.toLowerCase().includes(q))
        )
      : facts;

    const byCategory = new Map<string, DemoStudyFact[]>();
    for (const f of filtered) {
      const list = byCategory.get(f.category) ?? [];
      list.push(f);
      byCategory.set(f.category, list);
    }
    return Array.from(byCategory.entries()).sort(([a], [b]) => {
      const ai = CATEGORY_ORDER.indexOf(a);
      const bi = CATEGORY_ORDER.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }, [facts, query]);

  return (
    <main className="flex-1 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">High-Yield Cheat Sheet</h1>
          <p className="text-gray-600 mt-1">
            The facts you want cold on test day — labs, antidotes, positions, isolation, and clinical-judgment rules.
          </p>
        </div>

        {demoMode && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3 text-sm mb-4">
            <strong>Demo mode.</strong> Connect Supabase (set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code>, then run{' '}
            <code>schema.sql</code> and <code>seed.sql</code>) to manage facts in the database.
          </div>
        )}

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search facts (e.g. potassium, magnesium, ICP, droplet)"
          className="w-full max-w-md mb-6 px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm mb-6">
            {error}
          </div>
        )}

        {!facts && <p className="text-gray-500">Loading cheat sheet…</p>}

        {grouped && grouped.length === 0 && (
          <p className="text-gray-500">No facts match that search.</p>
        )}

        <div className="space-y-8">
          {grouped?.map(([category, items]) => (
            <section key={category}>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                {category}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((f) => (
                  <article
                    key={f.id}
                    className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{f.body}</p>
                    {f.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {f.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] uppercase tracking-wide bg-gray-100 text-gray-600 rounded px-1.5 py-0.5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

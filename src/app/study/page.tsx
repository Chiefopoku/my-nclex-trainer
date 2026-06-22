"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseClient } from "@/utils/supabaseClient";
import { DEMO_STUDY_FACTS, type DemoStudyFact } from "@/utils/demoData";

const CATEGORY_ORDER = [
  "Golden Rules",
  "NCJMM",
  "Lab Values",
  "Antidotes",
  "Positions",
  "Isolation",
  "Communication",
];

export default function StudyPage() {
  const [facts, setFacts] = useState<DemoStudyFact[] | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setFacts(DEMO_STUDY_FACTS);
      setDemoMode(true);
      return;
    }
    supabase
      .from("study_facts")
      .select("*")
      .then(({ data, error: e }) => {
        if (e || !data || data.length === 0) {
          setFacts(DEMO_STUDY_FACTS);
          setDemoMode(true);
          if (e)
            setError(`Showing baked-in facts. Supabase error: ${e.message}`);
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
            f.tags.some((t) => t.toLowerCase().includes(q)),
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
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            High-Yield Cheat Sheet
          </h1>
          <p className="text-slate-600 mt-1">
            The facts you want cold on test day — labs, antidotes, positions,
            isolation, and clinical-judgment rules.
          </p>
        </div>

        {demoMode && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-sm mb-4">
            <strong>Demo mode.</strong> Connect Supabase (set{" "}
            <code className="px-1 py-0.5 rounded bg-amber-100">
              NEXT_PUBLIC_SUPABASE_URL
            </code>{" "}
            and{" "}
            <code className="px-1 py-0.5 rounded bg-amber-100">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>{" "}
            in{" "}
            <code className="px-1 py-0.5 rounded bg-amber-100">.env.local</code>
            , then run{" "}
            <code className="px-1 py-0.5 rounded bg-amber-100">schema.sql</code>{" "}
            and{" "}
            <code className="px-1 py-0.5 rounded bg-amber-100">seed.sql</code>)
            to manage facts in the database.
          </div>
        )}

        <div className="relative max-w-md mb-6">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400"
          >
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search facts (potassium, ICP, droplet…)"
            className="w-full pl-8 pr-4 py-2.5 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
          />
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-xl p-4 text-sm mb-6">
            {error}
          </div>
        )}

        {!facts && <p className="text-slate-500">Loading cheat sheet…</p>}

        {grouped && grouped.length === 0 && (
          <p className="text-slate-500">No facts match that search.</p>
        )}

        <div className="space-y-8">
          {grouped?.map(([category, items]) => (
            <section key={category}>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
                {category}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((f) => (
                  <article
                    key={f.id}
                    className="group bg-white border border-stone-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
                  >
                    <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-indigo-800 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {f.body}
                    </p>
                    {f.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {f.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-medium uppercase tracking-wider bg-stone-100 text-slate-600 rounded-full px-2 py-0.5"
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

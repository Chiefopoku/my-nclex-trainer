"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseClient } from "@/utils/supabaseClient";
import {
  CHEAT_SHEET_CATEGORIES,
  CHEAT_SHEET_FACTS,
  type StudyFact,
} from "@/utils/cheatSheet";

const key = (f: StudyFact) => `${f.category}::${f.title}`.toLowerCase();

export default function StudyPage() {
  const [extraFacts, setExtraFacts] = useState<StudyFact[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  // The curated sheet ships with the app; any extra facts added to the
  // study_facts table in Supabase are merged in.
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    supabase
      .from("study_facts")
      .select("id, category, title, body, tags")
      .then(({ data }) => {
        if (data && data.length > 0) {
          const known = new Set(CHEAT_SHEET_FACTS.map(key));
          setExtraFacts(
            (data as unknown as StudyFact[])
              .map((f) => ({ ...f, tags: f.tags ?? [] }))
              .filter((f) => !known.has(key(f))),
          );
        }
      });
  }, []);

  const facts = useMemo(() => [...CHEAT_SHEET_FACTS, ...extraFacts], [extraFacts]);

  const categories = useMemo(() => {
    const extra = Array.from(new Set(extraFacts.map((f) => f.category))).filter(
      (c) => !CHEAT_SHEET_CATEGORIES.includes(c),
    );
    return [...CHEAT_SHEET_CATEGORIES, ...extra];
  }, [extraFacts]);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = facts.filter((f) => {
      if (category !== "All" && f.category !== category) return false;
      if (!q) return true;
      return (
        f.title.toLowerCase().includes(q) ||
        f.body.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
    const byCategory = new Map<string, StudyFact[]>();
    for (const f of filtered) {
      const list = byCategory.get(f.category) ?? [];
      list.push(f);
      byCategory.set(f.category, list);
    }
    return categories
      .filter((c) => byCategory.has(c))
      .map((c) => [c, byCategory.get(c) as StudyFact[]] as const);
  }, [facts, query, category, categories]);

  const shown = grouped.reduce((n, [, items]) => n + items.length, 0);

  return (
    <main className="flex-1 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">High-Yield Cheat Sheet</h1>
            <p className="text-slate-600 mt-1 max-w-2xl">
              {facts.length} facts across {categories.length} topics: strategy, labs, electrolytes,
              ECG, pharmacology, systems, maternity, pediatrics and mental health.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="print:hidden text-sm font-medium px-4 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-slate-700 shadow-sm"
          >
            Print / save PDF
          </button>
        </div>

        <div className="sticky top-14 z-20 -mx-4 px-4 py-3 bg-stone-50/90 backdrop-blur print:hidden">
          <div className="relative max-w-md mb-3">
            <span aria-hidden className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
              ⌕
            </span>
            <label htmlFor="fact-search" className="sr-only">Search the cheat sheet</label>
            <input
              id="fact-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: potassium, -olol, droplet, VEAL CHOP…"
              className="w-full pl-8 pr-4 py-2.5 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mb-1" role="tablist" aria-label="Topics">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  category === c
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-white border-stone-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3 mb-6">
          Showing {shown} of {facts.length}. Reference ranges vary slightly between textbooks; on
          the exam, always use the range given in the question.
        </p>

        {grouped.length === 0 && (
          <p className="text-slate-500">No facts match that search. Try a shorter term.</p>
        )}

        <div className="space-y-10">
          {grouped.map(([cat, items]) => (
            <section key={cat} aria-labelledby={`cat-${cat}`} className="break-inside-avoid">
              <h2
                id={`cat-${cat}`}
                className="text-[11px] font-bold uppercase tracking-widest text-indigo-700 mb-3 flex items-center gap-2"
              >
                {cat}
                <span className="text-slate-400 font-semibold">{items.length}</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((f) => (
                  <article
                    key={f.id}
                    className="group bg-white border border-stone-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all break-inside-avoid"
                  >
                    <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-indigo-800 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{f.body}</p>
                    {f.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {f.tags.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              setCategory("All");
                              setQuery(t);
                            }}
                            className="text-[10px] font-medium uppercase tracking-wider bg-stone-100 hover:bg-indigo-100 hover:text-indigo-800 text-slate-600 rounded-full px-2 py-0.5 transition-colors"
                            title={`Show everything tagged "${t}"`}
                          >
                            {t}
                          </button>
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

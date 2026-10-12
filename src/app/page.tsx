import Link from "next/link";
import { CHEAT_SHEET_CATEGORIES, CHEAT_SHEET_FACTS } from "@/utils/cheatSheet";

const FEATURES = [
  {
    title: "AI preceptor",
    body: "Answer a case, then get a rationale for why your choice was right or wrong and the clinical point to remember.",
    accent: "from-indigo-500/10 to-indigo-500/0",
    icon: "M12 3a7 7 0 0 0-4 12.7V18h8v-2.3A7 7 0 0 0 12 3zM9 21h6",
  },
  {
    title: "NCJMM-aligned",
    body: "Every question is tagged to one of the six clinical-judgment steps, so you can drill the step you miss most.",
    accent: "from-emerald-500/10 to-emerald-500/0",
    icon: "M4 19h16M7 16V9M12 16V5M17 16v-4",
  },
  {
    title: "High-yield cheat sheet",
    body: "Labs, electrolytes, ECG, drug endings and antidotes, positions, isolation, maternity and more. Searchable and printable.",
    accent: "from-amber-500/10 to-amber-500/0",
    icon: "M6 3h9l3 3v15H6zM9 9h6M9 13h6M9 17h4",
  },
];

const STEPS = [
  { title: "Read the case", body: "A short vignette with vitals and labs, like an NGN case study." },
  { title: "Choose the safest action", body: "Single-best-answer and select-all items, filtered by topic or NCJMM step." },
  { title: "Learn from the rationale", body: "See the right answer highlighted, why it is right, and a clinical pearl." },
];

export default function Home() {
  const stats = [
    { value: `${CHEAT_SHEET_FACTS.length}+`, label: "high-yield facts" },
    { value: `${CHEAT_SHEET_CATEGORIES.length}`, label: "review topics" },
    { value: "6", label: "NCJMM steps" },
    { value: "2026", label: "RN test plan" },
  ];

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/70 via-stone-50 to-stone-50"
        />
        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
          <span className="inline-flex items-center gap-2 bg-white border border-stone-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Free NCLEX-RN practice
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-5">
            Practice clinical judgment with{" "}
            <span className="bg-gradient-to-br from-indigo-600 to-violet-700 bg-clip-text text-transparent">
              an AI preceptor.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto mb-9 leading-relaxed">
            Realistic case vignettes, NCSBN-style questions and supportive rationales, built
            around the 2026 RN test plan and the clinical judgment model.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-7 rounded-xl shadow-sm shadow-indigo-600/20 transition-colors"
            >
              Start a scenario <span aria-hidden>→</span>
            </Link>
            <Link
              href="/study"
              className="inline-flex items-center justify-center bg-white hover:bg-stone-100 border border-stone-200 text-slate-800 font-medium py-3 px-7 rounded-xl transition-colors"
            >
              Open the cheat sheet
            </Link>
          </div>
          <p className="text-xs text-slate-500 mt-4">No sign-up needed. Your progress stays private to your browser.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-stone-200 rounded-2xl px-4 py-4 text-center shadow-sm">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-bold text-slate-900 tracking-tight">{s.value}</dd>
              <dd className="text-xs text-slate-500 mt-0.5">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-14">
        <div className="grid sm:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="relative overflow-hidden bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${f.accent} pointer-events-none`} />
              <div className="relative">
                <span className="inline-flex w-10 h-10 rounded-xl bg-indigo-600 text-white items-center justify-center mb-4 shadow-sm">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={f.icon} />
                  </svg>
                </span>
                <h2 className="font-semibold text-slate-900 mb-2">{f.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-center mb-8">How it works</h2>
          <ol className="grid sm:grid-cols-3 gap-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <span className="inline-flex w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-bold text-sm items-center justify-center mb-3">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-slate-900 mb-1">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="text-center mt-8">
            <Link href="/test-plan" className="text-sm font-medium text-indigo-700 hover:text-indigo-900">
              See how the 2026 NCLEX-RN test plan is weighted →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

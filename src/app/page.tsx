import Link from "next/link";

const FEATURES = [
  {
    title: "AI preceptor",
    body: "Personalized rationale on every answer — why your choice was right or wrong, and what to remember.",
    accent: "from-indigo-500/10 to-indigo-500/0",
  },
  {
    title: "NCJMM-aligned",
    body: "Questions tagged to each of the six clinical-judgment steps so you can practice the ones you fumble.",
    accent: "from-emerald-500/10 to-emerald-500/0",
  },
  {
    title: "High-yield cheat sheet",
    body: "Lab values, antidotes, positions, isolation — searchable, on tap.",
    accent: "from-amber-500/10 to-amber-500/0",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/60 via-stone-50 to-stone-50"
        />
        <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
          <span className="inline-flex items-center gap-2 bg-white border border-stone-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            NCLEX Adaptive Trainer
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-5">
            Practice clinical judgment with{" "}
            <span className="bg-gradient-to-br from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              an AI preceptor.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed">
            Realistic case vignettes, NCSBN-style questions, and supportive
            rationales — built around the 2026 RN test plan and the NCJMM.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-7 rounded-xl shadow-sm shadow-indigo-600/20 transition-colors"
            >
              Start a Scenario
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/study"
              className="inline-flex items-center justify-center bg-white hover:bg-stone-100 border border-stone-200 text-slate-800 font-medium py-3 px-7 rounded-xl transition-colors"
            >
              Open Cheat Sheet
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid sm:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="relative overflow-hidden bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-br ${f.accent} pointer-events-none`}
              />
              <div className="relative">
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {f.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

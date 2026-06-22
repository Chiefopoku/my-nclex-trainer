import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6">
          NCLEX Adaptive Trainer
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
          Practice clinical judgment with an AI preceptor.
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Realistic case vignettes, NCSBN-style questions, and personalized
          rationales powered by GPT-4o. Built around the 2026 RN test plan and
          the NCSBN Clinical Judgment Measurement Model.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Start a Scenario
          </Link>
          <Link
            href="/study"
            className="inline-block bg-white border border-gray-200 hover:border-gray-300 text-gray-800 font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Open Cheat Sheet
          </Link>
        </div>
      </div>
    </main>
  );
}

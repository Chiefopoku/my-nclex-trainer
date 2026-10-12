import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 mt-12 print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid gap-6 sm:grid-cols-[1.4fr_1fr] text-sm text-slate-500">
        <div>
          <p className="font-semibold text-slate-800 mb-1">NCLEX Adaptive Trainer</p>
          <p className="leading-relaxed max-w-md">
            A free study tool for the NCLEX-RN, built by a registered nurse. It is an
            educational aid, not a substitute for your program, a full question bank, or
            clinical judgment and facility policy.
          </p>
        </div>
        <div className="flex flex-col gap-1.5 sm:items-end">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/dashboard" className="hover:text-indigo-700">Practice</Link>
            <Link href="/study" className="hover:text-indigo-700">Cheat Sheet</Link>
            <Link href="/test-plan" className="hover:text-indigo-700">Test Plan</Link>
            <a
              href="https://github.com/Chiefopoku/my-nclex-trainer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-700"
            >
              Source
            </a>
          </nav>
          <p>
            Built by{" "}
            <a
              href="https://chiefopoku.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 hover:text-indigo-900"
            >
              Emmanuel Opoku-Adjei, RN
            </a>
          </p>
        </div>
      </div>
      <p className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 text-xs text-slate-400">
        NCLEX®, NCLEX-RN® and NCSBN® are registered trademarks of the National Council of State
        Boards of Nursing, Inc. This site is not affiliated with or endorsed by NCSBN.
      </p>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/dashboard", label: "Practice" },
  { href: "/progress", label: "Progress" },
  { href: "/study", label: "Cheat Sheet" },
  { href: "/test-plan", label: "Test Plan" },
];

export default function NavHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-stone-50/80 backdrop-blur border-b border-stone-200">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            N
          </span>
          <span className="font-semibold text-slate-900 tracking-tight group-hover:text-indigo-700 transition-colors">
            NCLEX Trainer
          </span>
        </Link>
        <ul className="flex gap-0.5 sm:gap-1 text-sm">
          {LINKS.map((l) => {
            const active =
              pathname === l.href || pathname?.startsWith(l.href + "/");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                    active
                      ? "bg-indigo-100 text-indigo-800"
                      : "text-slate-600 hover:text-slate-900 hover:bg-stone-100"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

import Link from 'next/link';

export default function NavHeader() {
  const links = [
    { href: '/dashboard', label: 'Practice' },
    { href: '/study', label: 'Cheat Sheet' },
    { href: '/test-plan', label: 'Test Plan' },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-gray-900">
          NCLEX Trainer
        </Link>
        <ul className="flex gap-1 sm:gap-2 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

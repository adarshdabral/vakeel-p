'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const lawyerNav = [
  { label: 'Dashboard', href: '/lawyer/dashboard' },
  { label: 'Bookings', href: '/lawyer/bookings' },
  { label: 'Sessions', href: '/lawyer/session' },
  { label: 'Earnings', href: '/lawyer/earnings' },
  { label: 'Profile', href: '/lawyer/profile' },
];

export function LawyerSidebar() {
  const pathname = usePathname();
  return (
    <aside className="min-h-screen w-64 border-r border-slate-100 bg-white/70 px-4 py-8">
      <p className="mb-6 text-xs font-semibold uppercase tracking-wide text-slate-400">Lawyer Console</p>
      <nav className="space-y-1">
        {lawyerNav.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block rounded-2xl px-4 py-2 text-sm font-medium text-slate-500 hover:text-accent',
              pathname.startsWith(link.href) && 'bg-secondary text-accent',
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

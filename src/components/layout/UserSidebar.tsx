'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const userNav = [
  { label: 'Dashboard', href: '/user/dashboard' },
  { label: 'Bookings', href: '/user/bookings' },
  { label: 'Lawyers', href: '/user/lawyers' },
  { label: 'Profile', href: '/user/profile' },
];

export function UserSidebar() {
  const pathname = usePathname();
  return (
    <aside className="min-h-screen w-64 border-r border-slate-100 bg-white/70 px-4 py-8">
      <p className="mb-6 text-xs font-semibold uppercase tracking-wide text-slate-400">Client Portal</p>
      <nav className="space-y-1">
        {userNav.map((link) => (
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

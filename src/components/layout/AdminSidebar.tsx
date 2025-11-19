'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const adminNav = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Users', href: '/admin/users' },
  { label: 'Lawyers', href: '/admin/lawyers' },
  { label: 'Bookings', href: '/admin/bookings' },
  { label: 'Payments', href: '/admin/payments' },
  { label: 'Verify Lawyers', href: '/admin/verify-lawyers' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="min-h-screen w-64 border-r border-slate-100 bg-white/80 px-4 py-8">
      <p className="mb-6 text-xs font-semibold uppercase tracking-wide text-slate-400">Admin Control</p>
      <nav className="space-y-1">
        {adminNav.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block rounded-2xl px-4 py-2 text-sm font-medium text-slate-500 hover:text-accent',
              pathname.startsWith(link.href) && 'bg-primary/10 text-primary',
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

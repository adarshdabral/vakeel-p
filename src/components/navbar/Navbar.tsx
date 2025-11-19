'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth-store';

interface NavLink {
  label: string;
  href: string;
}

const publicLinks: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Lawyers', href: '/user/lawyers' },
];

export function PublicNavbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white/90 px-8 py-4 backdrop-blur">
      <Link href="/" className="font-display text-2xl text-primary">
        Vakeel Pro
      </Link>
      <div className="flex items-center gap-8 text-sm font-medium text-accent/80">
        {publicLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost">
          <Link href="/auth/login">Sign in</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/register">Get started</Link>
        </Button>
      </div>
    </nav>
  );
}

const userLinks: NavLink[] = [
  { label: 'Dashboard', href: '/user/dashboard' },
  { label: 'Bookings', href: '/user/bookings' },
  { label: 'Lawyers', href: '/user/lawyers' },
];

const lawyerLinks: NavLink[] = [
  { label: 'Dashboard', href: '/lawyer/dashboard' },
  { label: 'Bookings', href: '/lawyer/bookings' },
  { label: 'Sessions', href: '/lawyer/session' },
];

const adminLinks: NavLink[] = [
  { label: 'Overview', href: '/admin/dashboard' },
  { label: 'Users', href: '/admin/users' },
  { label: 'Lawyers', href: '/admin/lawyers' },
  { label: 'Bookings', href: '/admin/bookings' },
  { label: 'Verify', href: '/admin/verify-lawyers' },
];

function RoleNavbar({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-3">
      <Link href="/" className="font-display text-xl text-primary">
        Vakeel Pro
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium text-accent/70">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={pathname.startsWith(link.href) ? 'text-primary' : undefined}>
            {link.label}
          </Link>
        ))}
      </div>
      <Button variant="outline" onClick={handleLogout}>
        Sign out
      </Button>
    </nav>
  );
}

export const UserNavbar = () => <RoleNavbar links={userLinks} />;
export const LawyerNavbar = () => <RoleNavbar links={lawyerLinks} />;
export const AdminNavbar = () => <RoleNavbar links={adminLinks} />;

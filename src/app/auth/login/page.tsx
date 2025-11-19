import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const loginOptions = [
  {
    role: 'Client',
    description: 'Book lawyers, manage sessions, and share documents securely.',
    href: '/auth/login/client',
  },
  {
    role: 'Lawyer',
    description: 'Review booking requests, accept sessions, and track earnings.',
    href: '/auth/login/lawyer',
  },
  {
    role: 'Admin',
    description: 'Verify lawyers, moderate payments, and audit platform activity.',
    href: '/auth/login/admin',
  },
];

export default function LoginLandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-8 px-6">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase text-primary">Sign in</p>
        <h1 className="font-display text-4xl text-accent">Choose your workspace</h1>
        <p className="text-slate-500">Each role gets a tailored dashboard, navigation, and permissions.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {loginOptions.map((option) => (
          <Card key={option.role} className="transition hover:-translate-y-1">
            <CardHeader>
              <CardTitle>{option.role}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={option.href} className="text-primary">
                Go to {option.role} login →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

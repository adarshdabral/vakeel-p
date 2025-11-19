import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const registerOptions = [
  {
    role: 'Client',
    description: 'Create an account to book lawyers and manage your sessions.',
    href: '/auth/register/client',
  },
  {
    role: 'Lawyer',
    description: 'Submit documents, list your expertise, and receive bookings.',
    href: '/auth/register/lawyer',
  },
];

export default function RegisterLandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-8 px-6">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase text-primary">Create account</p>
        <h1 className="font-display text-4xl text-accent">Choose your onboarding path</h1>
        <p className="text-slate-500">We verify every user and lawyer with OTP and document checks.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {registerOptions.map((option) => (
          <Card key={option.role} className="transition hover:-translate-y-1">
            <CardHeader>
              <CardTitle>{option.role}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={option.href} className="text-primary">
                Start as {option.role} →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

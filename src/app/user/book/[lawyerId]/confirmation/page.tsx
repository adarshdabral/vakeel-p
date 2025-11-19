import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { lawyers, sessions } from '@/data/mock';

interface PageProps {
  params: { lawyerId: string };
}

export default function ConfirmationPage({ params }: PageProps) {
  const lawyer = lawyers.find((entry) => entry.id === params.lawyerId);
  if (!lawyer) notFound();
  const session = sessions[0];

  return (
    <section className="space-y-6">
      <header className="flex flex-col items-center gap-4 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        <div>
          <h1 className="font-display text-3xl text-accent">Booking confirmed</h1>
          <p className="text-slate-500">We sent the OTP and session link to your email.</p>
        </div>
      </header>
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>{lawyer.name}</CardTitle>
          <CardDescription>Session ID: {session.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-500">OTP will be available 15 minutes before the call.</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/user/session/${session.id}/otp`}>View OTP</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/user/bookings">View all bookings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

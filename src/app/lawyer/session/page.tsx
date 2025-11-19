import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { sessions } from '@/data/mock';

export default function LawyerSessionsIndexPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-accent">Sessions</h1>
        <p className="text-slate-500">Select a session to verify OTP and join the call.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardHeader>
              <CardTitle>Session {session.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/lawyer/session/${session.id}/otp`} className="text-primary">
                View OTP →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

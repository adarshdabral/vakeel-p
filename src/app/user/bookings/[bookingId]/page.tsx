import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { bookings, lawyers, sessions } from '@/data/mock';
import { formatDate } from '@/utils/formatDate';

interface PageProps {
  params: { bookingId: string };
}

export default function BookingDetailsPage({ params }: PageProps) {
  const booking = bookings.find((entry) => entry.id === params.bookingId);
  if (!booking) notFound();
  const lawyer = lawyers.find((entry) => entry.id === booking.lawyerId);
  const session = sessions.find((entry) => entry.bookingId === booking.id);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase text-primary">Booking #{booking.id}</p>
          <h1 className="font-display text-3xl text-accent">{lawyer?.name}</h1>
          <p className="text-slate-500">Status: {booking.status}</p>
        </div>
        {session ? (
          <div className="flex gap-3">
            <Button asChild variant="secondary">
              <Link href={`/user/session/${session.id}/otp`}>Join session</Link>
            </Button>
            <Button variant="outline">Reschedule</Button>
          </div>
        ) : null}
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
          <CardDescription>Track timelines at a glance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-500">
          <p>When: {booking.scheduledFor ? formatDate(booking.scheduledFor) : 'To be confirmed'}</p>
          <p>Matter: {booking.matter}</p>
          <p>Fee: ₹{booking.amount}</p>
        </CardContent>
      </Card>
    </section>
  );
}

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { bookings, users, sessions } from '@/data/mock';
import { formatDate } from '@/utils/formatDate';

interface PageProps {
  params: Promise<{ bookingId: string }>;
}

export default function LawyerBookingDetails({ params }: PageProps) {
  const { bookingId } = use(params);
  const booking = bookings.find((entry) => entry.id === bookingId);
  if (!booking) notFound();
  const client = users.find((entry) => entry.id === booking.clientId);
  const session = sessions.find((entry) => entry.bookingId === booking.id);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase text-primary">Booking #{booking.id}</p>
          <h1 className="font-display text-3xl text-accent">{client?.name}</h1>
          <p className="text-slate-500">{booking.matter}</p>
        </div>
        {session ? (
          <Button asChild>
            <Link href={`/lawyer/session/${session.id}/otp`}>View session OTP</Link>
          </Button>
        ) : null}
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
          <CardDescription>Keep track of confirmed timings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-500">
          <p>Date & time: {booking.scheduledFor ? formatDate(booking.scheduledFor) : 'Awaiting confirmation'}</p>
          <p>Fee: ₹{booking.amount}</p>
        </CardContent>
      </Card>
    </section>
  );
}

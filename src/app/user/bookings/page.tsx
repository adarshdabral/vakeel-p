'use client';

import { useMemo, useState } from 'react';
import { bookings, lawyers } from '@/data/mock';
import { Tabs } from '@/components/ui/Tabs';
import { BookingCard } from '@/components/cards/BookingCard';

const tabs = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
];

export default function UserBookingsPage() {
  const [tab, setTab] = useState('upcoming');
  const filtered = useMemo(() => {
    return bookings.filter((booking) =>
      tab === 'upcoming' ? booking.status === 'pending' || booking.status === 'confirmed' : booking.status === 'completed',
    );
  }, [tab]);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-accent">Bookings</h1>
          <p className="text-slate-500">Upcoming and past consultations.</p>
        </div>
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
      </header>
      <div className="space-y-4">
        {filtered.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            lawyerName={lawyers.find((lawyer) => lawyer.id === booking.lawyerId)?.name ?? 'Assigned lawyer'}
          />
        ))}
      </div>
    </section>
  );
}

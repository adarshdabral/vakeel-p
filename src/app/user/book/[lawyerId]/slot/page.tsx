'use client';

import { useRouter } from 'next/navigation';
import { BookingForm } from '@/components/forms/BookingForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { lawyers } from '@/data/mock';
import { apiClient } from '@/lib/axios';
import { useNotificationStore } from '@/store/notification-store';

interface PageProps {
  params: { lawyerId: string };
}

export default function SlotSelectionPage({ params }: PageProps) {
  const router = useRouter();
  const pushToast = useNotificationStore((state) => state.pushToast);
  const lawyer = lawyers.find((entry) => entry.id === params.lawyerId);

  if (!lawyer) {
    return <p className="text-slate-500">We could not find that lawyer.</p>;
  }

  const handleSubmit = async (payload: { slot: string; notes: string; mode: 'video' | 'phone' }) => {
    await apiClient.post('/api/bookings', { lawyerId: lawyer.id, ...payload });
    pushToast({ title: 'Slot locked', description: 'Proceed to payment to confirm booking.', variant: 'success' });
    router.push(`/user/book/${lawyer.id}/payment`);
  };

  return (
    <section className="space-y-6">
      <header>
        <p className="text-sm uppercase text-primary">Step 1 of 3</p>
        <h1 className="font-display text-3xl text-accent">Pick a slot with {lawyer.name}</h1>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
          <CardDescription>Select a preferred time and add case context.</CardDescription>
        </CardHeader>
        <div className="px-6 pb-8">
          <BookingForm lawyer={lawyer} onSubmit={handleSubmit} />
        </div>
      </Card>
    </section>
  );
}

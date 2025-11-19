'use client';

import { useState } from 'react';
import { bookings } from '@/data/mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useNotificationStore } from '@/store/notification-store';

export default function LawyerBookingsPage() {
  const pushToast = useNotificationStore((state) => state.pushToast);
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});

  const handleAction = (id: string, nextStatus: string) => {
    setStatusMap((prev) => ({ ...prev, [id]: nextStatus }));
    pushToast({ title: `Booking ${nextStatus}`, description: `Booking ${id} updated.`, variant: 'success' });
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-accent">Booking requests</h1>
        <p className="text-slate-500">Accept or decline pending consultations.</p>
      </header>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <CardTitle>{booking.matter}</CardTitle>
              <CardDescription>Client #{booking.clientId}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-slate-500">Current status: {statusMap[booking.id] ?? booking.status}</p>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => handleAction(booking.id, 'accepted')}>
                  Accept
                </Button>
                <Button variant="outline" onClick={() => handleAction(booking.id, 'declined')}>
                  Decline
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

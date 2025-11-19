'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useNotificationStore } from '@/store/notification-store';

export default function LawyerProfilePage() {
  const [availability, setAvailability] = useState('09:00, 11:30, 15:00');
  const [bio, setBio] = useState('Family law specialist with 12 years of litigation experience.');
  const pushToast = useNotificationStore((state) => state.pushToast);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    pushToast({ title: 'Profile updated', description: 'Public profile refreshed for clients.', variant: 'success' });
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-accent">Public profile</h1>
        <p className="text-slate-500">Update your bio, languages, and slots.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Profile details</CardTitle>
          <CardDescription>Appears on your public listing.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-8">
          <Textarea rows={4} value={bio} onChange={(event) => setBio(event.target.value)} />
          <Input
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
            placeholder="Comma separated slots"
          />
          <Button type="submit">Save profile</Button>
        </form>
      </Card>
    </section>
  );
}

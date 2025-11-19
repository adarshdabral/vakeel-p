'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useNotificationStore } from '@/store/notification-store';

export default function UserProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Arjun Patel',
    email: 'arjun@client.com',
    phone: '+91 90000 00000',
    notes: 'Prefers morning consultations.',
  });
  const [loading, setLoading] = useState(false);
  const pushToast = useNotificationStore((state) => state.pushToast);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    pushToast({ title: 'Profile updated', description: 'Your changes were saved.', variant: 'success' });
    setLoading(false);
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-accent">Profile</h1>
        <p className="text-slate-500">Keep your personal information and case notes updated.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Contact details</CardTitle>
          <CardDescription>We use this information for OTP alerts and invoice receipts.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-8">
          <Input value={profile.name} onChange={(event) => setProfile((prev) => ({ ...prev, name: event.target.value }))} />
          <Input
            value={profile.email}
            type="email"
            onChange={(event) => setProfile((prev) => ({ ...prev, email: event.target.value }))}
          />
          <Input
            value={profile.phone}
            onChange={(event) => setProfile((prev) => ({ ...prev, phone: event.target.value }))}
            placeholder="Phone number"
          />
          <Textarea
            rows={4}
            value={profile.notes}
            onChange={(event) => setProfile((prev) => ({ ...prev, notes: event.target.value }))}
            placeholder="Case preferences, language preferences, etc."
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving…' : 'Save changes'}
          </Button>
        </form>
      </Card>
    </section>
  );
}

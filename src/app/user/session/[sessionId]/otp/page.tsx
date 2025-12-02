'use client';

import { useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { OTPInput } from '@/components/forms/OTPInput';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { sessions } from '@/data/mock';
import { useSessionStore } from '@/store/session-store';
import { useNotificationStore } from '@/store/notification-store';

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

export default function SessionOtpPage({ params }: PageProps) {
  const router = useRouter();
  const { sessionId } = use(params);
  const setSession = useSessionStore((state) => state.setSession);
  const verifyOtp = useSessionStore((state) => state.verifyOtp);
  const pushToast = useNotificationStore((state) => state.pushToast);
  const session = sessions.find((entry) => entry.id === sessionId);

  useEffect(() => {
    if (session) {
      setSession(session.id, session.bookingId);
    }
  }, [session, setSession]);

  const handleVerify = async (code: string) => {
    const ok = verifyOtp(code);
    if (ok) {
      pushToast({ title: 'OTP verified', description: 'Launching secure call.', variant: 'success' });
      router.push(`/user/session/${sessionId}/call`);
    } else {
      pushToast({ title: 'Invalid OTP', description: 'Please try again.', variant: 'error' });
    }
  };

  return (
    <section className="space-y-6">
      <header>
        <p className="text-sm uppercase text-primary">Step 1</p>
        <h1 className="font-display text-3xl text-accent">Pre-call OTP</h1>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Session security</CardTitle>
          <CardDescription>Enter the 6-digit OTP we sent via SMS & email.</CardDescription>
        </CardHeader>
        <div className="px-6 pb-8">
          <OTPInput onVerify={handleVerify} />
        </div>
      </Card>
    </section>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OTPInput } from '@/components/forms/OTPInput';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { sessions } from '@/data/mock';
import { useSessionStore } from '@/store/session-store';
import { useNotificationStore } from '@/store/notification-store';

interface PageProps {
  params: { sessionId: string };
}

export default function LawyerSessionOtpPage({ params }: PageProps) {
  const router = useRouter();
  const pushToast = useNotificationStore((state) => state.pushToast);
  const setSession = useSessionStore((state) => state.setSession);
  const verifyOtp = useSessionStore((state) => state.verifyOtp);
  const session = sessions.find((entry) => entry.id === params.sessionId);

  useEffect(() => {
    if (session) {
      setSession(session.id, session.bookingId);
    }
  }, [session, setSession]);

  const handleVerify = (code: string) => {
    if (verifyOtp(code)) {
      pushToast({ title: 'OTP matched', description: 'Launching client call.', variant: 'success' });
      router.push(`/lawyer/session/${params.sessionId}/call`);
    } else {
      pushToast({ title: 'Incorrect OTP', description: 'Please re-check.', variant: 'error' });
    }
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-accent">Verify session OTP</h1>
        <p className="text-slate-500">Ensure the client is present before joining.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Enter OTP</CardTitle>
          <CardDescription>Only proceed after confirming the 6-digit code.</CardDescription>
        </CardHeader>
        <div className="px-6 pb-8">
          <OTPInput onVerify={handleVerify} />
        </div>
      </Card>
    </section>
  );
}

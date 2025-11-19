'use client';

import { useEffect } from 'react';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { ChatBox } from '@/components/video/ChatBox';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { sessions } from '@/data/mock';
import { useSessionStore } from '@/store/session-store';

interface PageProps {
  params: { sessionId: string };
}

export default function LawyerCallPage({ params }: PageProps) {
  const session = sessions.find((entry) => entry.id === params.sessionId);
  const setCallState = useSessionStore((state) => state.setCallState);

  useEffect(() => {
    setCallState('live');
  }, [setCallState]);

  return (
    <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        <header>
          <p className="text-sm uppercase text-primary">Secure call</p>
          <h1 className="font-display text-3xl text-accent">Session {session?.id}</h1>
          <p className="text-slate-500">Share evidence, chat, and notes within one call.</p>
        </header>
        <VideoPlayer role="lawyer" />
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Client notes</CardTitle>
            <CardDescription>Keep track of instructions.</CardDescription>
          </CardHeader>
        </Card>
        <ChatBox role="lawyer" />
      </div>
    </section>
  );
}

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

export default function UserCallPage({ params }: PageProps) {
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
          <p className="text-slate-500">Encrypted WebRTC call with legal notes synced automatically.</p>
        </header>
        <VideoPlayer role="client" />
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Live chat</CardTitle>
            <CardDescription>Share links and notes during the call.</CardDescription>
          </CardHeader>
        </Card>
        <ChatBox role="client" />
      </div>
    </section>
  );
}

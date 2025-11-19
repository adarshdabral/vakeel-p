'use client';

import { MicOff, Mic, VideoIcon, VideoOff, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSessionStore } from '@/store/session-store';

interface VideoPlayerProps {
  role: 'client' | 'lawyer';
}

export function VideoPlayer({ role }: VideoPlayerProps) {
  const { muted, cameraOff, toggleMute, toggleCamera, endCall } = useSessionStore();

  return (
    <section className="space-y-4 rounded-3xl bg-accent/90 p-6 text-white shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <VideoTile label={role === 'client' ? 'You' : 'Client'} muted={muted} cameraOff={cameraOff} />
        <VideoTile label={role === 'client' ? 'Lawyer' : 'You'} muted={false} cameraOff={false} remote />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleMute} aria-label="Toggle microphone">
          {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleCamera} aria-label="Toggle camera">
          {cameraOff ? <VideoOff className="h-5 w-5" /> : <VideoIcon className="h-5 w-5" />}
        </Button>
        <Button variant="outline" className="bg-rose-500 text-white" size="icon" onClick={endCall} aria-label="End call">
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}

function VideoTile({ label, muted, cameraOff, remote = false }: { label: string; muted: boolean; cameraOff: boolean; remote?: boolean }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black/40">
      {cameraOff ? (
        <div className="flex h-full items-center justify-center text-2xl font-semibold text-white/80">Camera off</div>
      ) : (
        <div className="flex h-full items-center justify-center text-xl font-semibold text-white/70">
          {remote ? 'Remote video stream' : 'Your stream'}
        </div>
      )}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-wide text-white">
        <span>{label}</span>
        {muted ? <MicOff className="h-3.5 w-3.5" /> : null}
      </div>
    </div>
  );
}

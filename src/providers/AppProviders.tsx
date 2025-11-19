'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { getSocket } from '@/lib/socket';

export function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SIGNALING_URL) {
      return undefined;
    }
    const socket = getSocket();
    socket.connect?.();

    return () => {
      socket.disconnect?.();
    };
  }, []);

  return <>{children}</>;
}

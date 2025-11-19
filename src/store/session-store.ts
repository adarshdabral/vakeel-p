'use client';

import { create } from 'zustand';

export type CallState = 'idle' | 'otp' | 'ringing' | 'live' | 'ended';

type ChatMessage = {
  id: string;
  sender: 'client' | 'lawyer';
  content: string;
  timestamp: string;
};

interface SessionStore {
  sessionId: string | null;
  bookingId: string | null;
  callState: CallState;
  otpVerified: boolean;
  muted: boolean;
  cameraOff: boolean;
  chatMessages: ChatMessage[];
  setSession: (sessionId: string, bookingId: string) => void;
  setCallState: (state: CallState) => void;
  verifyOtp: (code: string) => boolean;
  toggleMute: () => void;
  toggleCamera: () => void;
  addMessage: (message: ChatMessage) => void;
  endCall: () => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  sessionId: null,
  bookingId: null,
  callState: 'idle',
  otpVerified: false,
  muted: false,
  cameraOff: false,
  chatMessages: [],
  setSession: (sessionId, bookingId) => set({ sessionId, bookingId, callState: 'otp', otpVerified: false }),
  setCallState: (state) => set({ callState: state }),
  verifyOtp: (code) => {
    const isValid = code === '123456';
    if (isValid) {
      set({ otpVerified: true, callState: 'ringing' });
    }
    return isValid;
  },
  toggleMute: () => set((state) => ({ muted: !state.muted })),
  toggleCamera: () => set((state) => ({ cameraOff: !state.cameraOff })),
  addMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  endCall: () => set({ callState: 'ended' }),
}));

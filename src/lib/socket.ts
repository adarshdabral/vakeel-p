import { io, type Socket } from 'socket.io-client';

type SignalEvents = {
  'call:offer': (payload: unknown) => void;
  'call:answer': (payload: unknown) => void;
  'call:ice': (payload: unknown) => void;
  'chat:message': (payload: unknown) => void;
};

type GenericSocket = Socket<SignalEvents> & {
  connect?: () => void;
  disconnect?: () => void;
};

let socket: GenericSocket | null = null;

const SIGNAL_URL = process.env.NEXT_PUBLIC_SIGNALING_URL;

export const getSocket = () => {
  if (socket) return socket;

  if (!SIGNAL_URL) {
    socket = {
      on: () => socket,
      off: () => socket,
      emit: () => socket,
    } as unknown as GenericSocket;
    return socket;
  }

  try {
    socket = io(SIGNAL_URL, {
      autoConnect: false,
      transports: ['websocket'],
    });
  } catch (error) {
    socket = {
      on: () => socket,
      off: () => socket,
      emit: () => socket,
    } as unknown as GenericSocket;
  }

  return socket;
};

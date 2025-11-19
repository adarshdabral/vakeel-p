import { create } from 'zustand';
import { apiClient } from '@/lib/axios';
import type { User, UserRole } from '@/types/user';
import { useNotificationStore } from './notification-store';

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

type LoginPayload = {
  email: string;
  password: string;
  role?: UserRole | 'client';
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role?: UserRole | 'client';
  city?: string;
  category?: string;
};

interface AuthState {
  user: User | null;
  status: AuthStatus;
  error?: string;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'idle',
  login: async (payload) => {
    set({ status: 'loading', error: undefined });
    try {
      const { data } = await apiClient.post('/api/auth/login', payload);
      set({ user: data.user, status: 'authenticated' });
      useNotificationStore.getState().pushToast({
        title: 'Welcome back',
        description: `Signed in as ${data.user.name}`,
        variant: 'success',
      });
    } catch (error) {
      set({ status: 'error', error: 'Unable to login' });
      useNotificationStore.getState().pushToast({
        title: 'Login failed',
        description: 'Please double-check your credentials.',
        variant: 'error',
      });
      throw error;
    }
  },
  register: async (payload) => {
    set({ status: 'loading', error: undefined });
    try {
      await apiClient.post('/api/auth/register', payload);
      set({ status: 'idle', user: null, error: undefined });
      useNotificationStore.getState().pushToast({
        title: 'Account created',
        description: 'You can now log in with your credentials.',
        variant: 'success',
      });
    } catch (error) {
      set({ status: 'error', error: 'Unable to register' });
      useNotificationStore.getState().pushToast({
        title: 'Registration failed',
        description: 'Try again or contact support.',
        variant: 'error',
      });
      throw error;
    }
  },
  logout: async () => {
    await apiClient.post('/api/auth/logout');
    set({ user: null, status: 'idle', error: undefined });
    useNotificationStore.getState().pushToast({
      title: 'Signed out',
      description: 'You have been logged out securely.',
      variant: 'info',
    });
  },
}));

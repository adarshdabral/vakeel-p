'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/auth-store';
import { useNotificationStore } from '@/store/notification-store';

interface LoginFormProps {
  role: 'client' | 'lawyer' | 'admin';
}

export function LoginForm({ role }: LoginFormProps) {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const pushToast = useNotificationStore((state) => state.pushToast);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login({ ...form, role: role === 'client' ? 'client' : role });
      router.push(role === 'client' ? '/user/dashboard' : role === 'lawyer' ? '/lawyer/dashboard' : '/admin/dashboard');
    } catch (error) {
      pushToast({
        title: 'Authentication failed',
        description: (error as Error).message ?? 'Could not login',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-accent">Email</label>
        <Input
          required
          name="email"
          type="email"
          placeholder={`${role}name@vakeel.pro`}
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-accent">Password</label>
        <Input
          required
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/auth-store';
import { useNotificationStore } from '@/store/notification-store';

interface RegisterFormProps {
  role: 'client' | 'lawyer';
}

export function RegisterForm({ role }: RegisterFormProps) {
  const register = useAuthStore((state) => state.register);
  const pushToast = useNotificationStore((state) => state.pushToast);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await register({ ...form, role: role === 'client' ? 'client' : 'lawyer' });
      pushToast({ title: 'OTP sent', description: 'Please verify the code sent to your email.', variant: 'info' });
    } catch (error) {
      pushToast({ title: 'Could not register', description: (error as Error).message, variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-accent">Full name</label>
        <Input required name="name" placeholder="Aisha Khan" value={form.name} onChange={handleChange} />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-accent">Email</label>
        <Input required name="email" type="email" placeholder="you@vakeel.pro" value={form.email} onChange={handleChange} />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-accent">Password</label>
        <Input
          required
          name="password"
          type="password"
          placeholder="Create a strong password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  );
}

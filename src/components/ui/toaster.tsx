'use client';

import { X, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useNotificationStore } from '@/store/notification-store';
import { cn } from '@/lib/utils';

const variantStyles = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-rose-200 bg-rose-50 text-rose-900',
  info: 'border-primary/30 bg-white text-accent',
};

const variantIcon = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

export function Toaster() {
  const { toasts, dismissToast } = useNotificationStore();

  return (
    <aside className="fixed bottom-6 right-6 z-[999] flex w-80 flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = variantIcon[toast.variant ?? 'info'];
        return (
          <div
            key={toast.id}
            className={cn(
              'flex items-start gap-3 rounded-2xl border p-4 shadow-soft transition animate-in slide-in-from-bottom-4',
              variantStyles[toast.variant ?? 'info'],
            )}
          >
            <Icon className="mt-0.5 h-5 w-5" />
            <div className="flex-1">
              <p className="font-semibold">{toast.title}</p>
              {toast.description ? <p className="text-sm opacity-80">{toast.description}</p> : null}
            </div>
            <button
              type="button"
              className="rounded-full p-1 hover:bg-black/10"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </aside>
  );
}

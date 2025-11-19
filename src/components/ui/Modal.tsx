import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

interface ModalProps {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  children: ReactNode;
}

export function Modal({ title, description, primaryAction, secondaryAction, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent/30 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-100 bg-white/95 p-8 shadow-soft">
        <header className="space-y-2">
          <h3 className="font-display text-2xl text-accent">{title}</h3>
          {description ? <p className="text-sm text-slate-500">{description}</p> : null}
        </header>
        <div className="mt-6 space-y-4 text-accent">{children}</div>
        {(primaryAction || secondaryAction) && (
          <footer className="mt-8 flex flex-wrap gap-3">
            {secondaryAction ? (
              <Button variant="ghost" type="button" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            ) : null}
            {primaryAction ? (
              <Button type="button" onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            ) : null}
          </footer>
        )}
      </div>
    </div>
  );
}

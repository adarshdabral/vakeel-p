'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Tab = {
  value: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
};

export function Tabs({ tabs, value, onChange }: TabsProps) {
  return (
    <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-soft">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            'rounded-xl px-4 py-2 text-sm font-medium transition',
            value === tab.value ? 'bg-primary text-white shadow' : 'text-slate-500 hover:text-accent',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

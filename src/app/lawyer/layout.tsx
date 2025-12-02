'use client';

import type { ReactNode } from 'react';
import { LawyerNavbar } from '@/components/navbar/Navbar';
import { LawyerSidebar } from '@/components/layout/LawyerSidebar';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function LawyerLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="lawyer">
      <div className="min-h-screen bg-secondary/60">
        <LawyerNavbar />
        <div className="mx-auto flex max-w-7xl">
          <LawyerSidebar />
          <main className="flex-1 space-y-6 px-8 py-10">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

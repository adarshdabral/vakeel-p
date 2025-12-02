'use client';

import type { ReactNode } from 'react';
import { UserNavbar } from '@/components/navbar/Navbar';
import { UserSidebar } from '@/components/layout/UserSidebar';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="client">
      <div className="min-h-screen bg-secondary/60">
        <UserNavbar />
        <div className="mx-auto flex max-w-7xl">
          <UserSidebar />
          <main className="flex-1 space-y-6 px-8 py-10">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

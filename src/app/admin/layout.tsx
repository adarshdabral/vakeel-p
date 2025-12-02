'use client';

import type { ReactNode } from 'react';
import { AdminNavbar } from '@/components/navbar/Navbar';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-secondary/60">
        <AdminNavbar />
        <div className="mx-auto flex max-w-7xl">
          <AdminSidebar />
          <main className="flex-1 space-y-6 px-8 py-10">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

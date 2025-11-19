import { LoginForm } from '@/components/forms/LoginForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6">
      <Card className="w-full space-y-6">
        <CardHeader>
          <p className="text-sm uppercase text-primary">Admin console</p>
          <CardTitle className="text-3xl">Admin login</CardTitle>
          <CardDescription>Monitor KPIs, verify lawyers, and approve payouts.</CardDescription>
        </CardHeader>
        <div className="px-6 pb-8">
          <LoginForm role="admin" />
        </div>
      </Card>
    </main>
  );
}

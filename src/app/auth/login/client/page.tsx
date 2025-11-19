import Link from 'next/link';
import { LoginForm } from '@/components/forms/LoginForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function ClientLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center px-6">
      <Card className="w-full space-y-6">
        <CardHeader>
          <p className="text-sm uppercase text-primary">Client workspace</p>
          <CardTitle className="text-3xl">Client login</CardTitle>
          <CardDescription>Book verified lawyers, manage payments, and join secure sessions.</CardDescription>
        </CardHeader>
        <div className="px-6 pb-8">
          <LoginForm role="client" />
          <p className="mt-4 text-center text-sm text-slate-500">
            New here?{' '}
            <Link href="/auth/register/client" className="text-primary">
              Create a client account
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
}

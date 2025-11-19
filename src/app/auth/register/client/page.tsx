import Link from 'next/link';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function ClientRegisterPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center px-6">
      <Card className="w-full space-y-6">
        <CardHeader>
          <p className="text-sm uppercase text-primary">Client onboarding</p>
          <CardTitle className="text-3xl">Create a client account</CardTitle>
          <CardDescription>Track bookings, payments, and case notes from a single dashboard.</CardDescription>
        </CardHeader>
        <div className="px-6 pb-8">
          <RegisterForm role="client" />
          <p className="mt-4 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/auth/login/client" className="text-primary">
              Sign in instead
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
}

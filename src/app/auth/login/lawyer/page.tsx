import Link from 'next/link';
import { LoginForm } from '@/components/forms/LoginForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function LawyerLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center px-6">
      <Card className="w-full space-y-6">
        <CardHeader>
          <p className="text-sm uppercase text-primary">Lawyer workspace</p>
          <CardTitle className="text-3xl">Lawyer login</CardTitle>
          <CardDescription>Accept bookings, verify OTPs, and conduct video calls with clients.</CardDescription>
        </CardHeader>
        <div className="px-6 pb-8">
          <LoginForm role="lawyer" />
          <p className="mt-4 text-center text-sm text-slate-500">
            Not registered?
            <Link href="/auth/register/lawyer" className="text-primary">
              Complete lawyer onboarding
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
}

import Link from 'next/link';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function LawyerRegisterPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center px-6">
      <Card className="w-full space-y-6">
        <CardHeader>
          <p className="text-sm uppercase text-primary">Lawyer onboarding</p>
          <CardTitle className="text-3xl">Register as a lawyer</CardTitle>
          <CardDescription>Verify documents, publish your expertise, and start receiving bookings.</CardDescription>
        </CardHeader>
        <div className="px-6 pb-8">
          <RegisterForm role="lawyer" />
          <p className="mt-4 text-center text-sm text-slate-500">
            Already verified?{' '}
            <Link href="/auth/login/lawyer" className="text-primary">
              Sign in here
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
}

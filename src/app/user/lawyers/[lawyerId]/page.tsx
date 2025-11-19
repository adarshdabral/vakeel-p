import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { lawyers } from '@/data/mock';

interface PageProps {
  params: { lawyerId: string };
}

export default function LawyerDetailsPage({ params }: PageProps) {
  const lawyer = lawyers.find((entry) => entry.id === params.lawyerId);
  if (!lawyer) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase text-primary">Lawyer details</p>
          <h1 className="font-display text-3xl text-accent">{lawyer!.name}</h1>
          <p className="text-slate-500">{lawyer!.specialization}</p>
        </div>
        <Button asChild>
          <Link href={`/user/book/${lawyer!.id}/slot`}>Book this lawyer</Link>
        </Button>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Expertise & availability</CardTitle>
          <CardDescription>Languages, experience, and pricing.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Experience</p>
            <p className="text-xl font-semibold text-accent">{lawyer!.experience}+ years</p>
            <p className="text-sm text-slate-500">Languages: {lawyer!.languages?.join(', ')}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Session fee</p>
            <p className="text-xl font-semibold text-accent">₹{lawyer!.price}</p>
            <div className="flex flex-wrap gap-2">
              {lawyer!.availability?.map((slot) => (
                <span key={slot} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-accent">
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

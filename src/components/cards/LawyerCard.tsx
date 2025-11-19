import Link from 'next/link';
import { MapPin, Briefcase, CheckCircle2 } from 'lucide-react';
import type { Lawyer } from '@/types/lawyer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

interface LawyerCardProps {
  lawyer: Lawyer;
  onSelect?: (lawyer: Lawyer) => void;
  showProfileLink?: boolean;
}

export function LawyerCard({ lawyer, onSelect, showProfileLink = true }: LawyerCardProps) {
  return (
    <Card className="space-y-4">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
            {lawyer.name
              .split(' ')
              .map((word) => word[0])
              .join('')}
          </div>
          <div>
            <CardTitle>{lawyer.name}</CardTitle>
            <CardDescription>{lawyer.specialization}</CardDescription>
          </div>
          {lawyer.verified ? <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-500" /> : null}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          {lawyer.city ? (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {lawyer.city}
            </span>
          ) : null}
          {lawyer.category ? (
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" /> {lawyer.category}
            </span>
          ) : null}
          {lawyer.experience ? <span>{lawyer.experience}+ yrs exp.</span> : null}
          {lawyer.price ? <span>₹{lawyer.price} / session</span> : null}
        </div>
        {lawyer.languages?.length ? (
          <div className="mt-3 text-sm">
            <span className="font-medium text-accent">Languages:</span> {lawyer.languages.join(', ')}
          </div>
        ) : null}
        {lawyer.availability?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {lawyer.availability.map((slot) => (
              <span key={slot} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-accent">
                {slot}
              </span>
            ))}
          </div>
        ) : null}
      </CardContent>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Trusted by clients nationwide</p>
        {onSelect ? (
          <Button onClick={() => onSelect(lawyer)}>Book session</Button>
        ) : showProfileLink ? (
          <Button asChild variant="secondary">
            <Link href={`/user/lawyers/${lawyer.id}`}>View profile</Link>
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

import { LawyerCard } from '@/components/cards/LawyerCard';
import { lawyers } from '@/data/mock';
import { Button } from '@/components/ui/Button';

export default function AdminLawyersPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-accent">Lawyers</h1>
        <p className="text-slate-500">Verify and manage lawyers across states.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {lawyers.map((lawyer) => (
          <div key={lawyer.id} className="space-y-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-soft">
            <LawyerCard lawyer={lawyer} />
            {!lawyer.verified && <Button variant="secondary">Mark as verified</Button>}
          </div>
        ))}
      </div>
    </section>
  );
}

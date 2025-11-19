'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { lawyerDocuments, lawyers } from '@/data/mock';
import { useNotificationStore } from '@/store/notification-store';

export default function VerifyLawyersPage() {
  const pending = lawyerDocuments.filter((doc) => doc.status === 'pending');

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-accent">Verify lawyers</h1>
        <p className="text-slate-500">Approve bar council IDs and KYC documents.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {pending.map((doc) => {
          const lawyer = lawyers.find((entry) => entry.id === doc.lawyerId);
          return (
            <VerifyCard key={doc.lawyerId} lawyerName={lawyer?.name ?? doc.lawyerId} doc={doc} />
          );
        })}
      </div>
    </section>
  );
}

function VerifyCard({ lawyerName, doc }: { lawyerName: string; doc: (typeof lawyerDocuments)[number] }) {
  const pushToast = useNotificationStore((state) => state.pushToast);

  const handleDecision = (decision: 'approved' | 'rejected') => {
    pushToast({
      title: `Document ${decision}`,
      description: `${lawyerName} has been ${decision}.`,
      variant: decision === 'approved' ? 'success' : 'error',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lawyerName}</CardTitle>
        <CardDescription>Bar Council ID: {doc.barCouncilId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-slate-500">ID proof: {doc.identityProof}</p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => handleDecision('approved')}>
            Approve
          </Button>
          <Button variant="outline" onClick={() => handleDecision('rejected')}>
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

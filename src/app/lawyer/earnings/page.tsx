import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { payments } from '@/data/mock';
import { formatAmount } from '@/lib/payment';

export default function LawyerEarningsPage() {
  const total = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-accent">Earnings</h1>
        <p className="text-slate-500">Track payouts and pending invoices.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Total earnings</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold text-accent">{formatAmount(total)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent payments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
              <span>Booking {payment.bookingId}</span>
              <span className="font-medium text-accent">{formatAmount(payment.amount)}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

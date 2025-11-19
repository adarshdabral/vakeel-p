import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { bookings } from '@/data/mock';

export default function AdminBookingsPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-accent">All bookings</h1>
        <p className="text-slate-500">Monitor platform-wide consultations.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {bookings.map((booking) => (
            <div key={booking.id} className="grid gap-2 rounded-2xl border border-slate-100 p-3 md:grid-cols-4">
              <span>#{booking.id}</span>
              <span>Client {booking.clientId}</span>
              <span>Lawyer {booking.lawyerId}</span>
              <span className="text-slate-500">{booking.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

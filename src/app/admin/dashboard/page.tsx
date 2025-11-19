import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { bookings, lawyers, users } from '@/data/mock';

export default function AdminDashboardPage() {
  return (
    <section className="space-y-8">
      <header>
        <p className="text-sm uppercase text-primary">Admin overview</p>
        <h1 className="font-display text-3xl text-accent">Platform health</h1>
        <p className="text-slate-500">Live snapshot of clients, lawyers, and bookings.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Active clients</CardDescription>
            <CardTitle className="text-3xl">{users.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Verified lawyers</CardDescription>
            <CardTitle className="text-3xl">{lawyers.filter((lawyer) => lawyer.verified).length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total bookings</CardDescription>
            <CardTitle className="text-3xl">{bookings.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent bookings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
              <span>Booking {booking.id}</span>
              <span className="text-slate-500">{booking.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

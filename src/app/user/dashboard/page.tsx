import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { BookingCard } from '@/components/cards/BookingCard';
import { bookings, lawyers } from '@/data/mock';

const stats = [
  { label: 'Upcoming sessions', value: bookings.filter((b) => b.status === 'confirmed').length },
  { label: 'Completed sessions', value: bookings.filter((b) => b.status === 'completed').length },
  { label: 'Pending approvals', value: bookings.filter((b) => b.status === 'pending').length },
];

export default function UserDashboardPage() {
  const nextBookings = bookings.filter((booking) => booking.status !== 'completed').slice(0, 2);

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-primary">Client dashboard</p>
        <h1 className="font-display text-3xl text-accent">Welcome back</h1>
        <p className="text-slate-500">Track your bookings, verify OTPs, and jump into sessions instantly.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Next bookings</CardTitle>
          <CardDescription>Your upcoming calls and pending approvals.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {nextBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              lawyerName={lawyers.find((lawyer) => lawyer.id === booking.lawyerId)?.name ?? 'Assigned lawyer'}
            />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

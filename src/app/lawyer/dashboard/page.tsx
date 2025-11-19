import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { bookings } from '@/data/mock';

export default function LawyerDashboardPage() {
  const todays = bookings.filter((booking) => booking.status === 'confirmed');

  return (
    <section className="space-y-8">
      <header>
        <p className="text-sm uppercase text-primary">Lawyer dashboard</p>
        <h1 className="font-display text-3xl text-accent">Today’s schedule</h1>
        <p className="text-slate-500">Review OTPs, accept requests, and start sessions on time.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Meetings today</CardDescription>
            <CardTitle className="text-3xl">{todays.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Pending approvals</CardDescription>
            <CardTitle className="text-3xl">{bookings.filter((b) => b.status === 'pending').length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Completed this week</CardDescription>
            <CardTitle className="text-3xl">{bookings.filter((b) => b.status === 'completed').length}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Today’s meetings</CardTitle>
          <CardDescription>OTP unlocks 15 minutes before the call.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {todays.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
              <div>
                <p className="font-medium text-accent">{booking.matter}</p>
                <p className="text-sm text-slate-500">Client #{booking.clientId}</p>
              </div>
              <span className="text-sm text-primary">{new Date(booking.scheduledFor ?? '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import type { Booking } from '@/types/booking';
import { formatDate } from '@/utils/formatDate';
import { Card } from '@/components/ui/Card';

interface BookingCardProps {
  booking: Booking;
  lawyerName: string;
  onClick?: () => void;
}

export function BookingCard({ booking, lawyerName, onClick }: BookingCardProps) {
  return (
    <Card className="flex flex-col gap-4 border-l-4 border-l-primary/60">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-slate-400">{booking.status}</p>
          <h4 className="font-display text-xl text-accent">{lawyerName}</h4>
          <p className="text-sm text-slate-500">{booking.matter}</p>
        </div>
        {onClick ? (
          <button type="button" className="text-primary" onClick={onClick}>
            <ArrowRight className="h-5 w-5" />
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
        {booking.scheduledFor ? (
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" /> {formatDate(booking.scheduledFor)}
          </span>
        ) : null}
        {booking.scheduledFor ? (
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {new Date(booking.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        ) : null}
        {booking.amount ? <span>₹{booking.amount}</span> : null}
      </div>
    </Card>
  );
}

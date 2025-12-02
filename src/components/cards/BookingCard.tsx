import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import type { Booking } from '@/types/booking';
import { formatDate } from '@/utils/formatDate';
import { Card } from '@/components/ui/Card';


interface BookingCardProps {
  booking: any;
  lawyerName: string;
  lawyerSpecialization?: string;
  lawyerCategory?: string;
  lawyerCity?: string;
  clientName?: string;
  onClick?: () => void;
}

export function BookingCard({ booking, lawyerName, lawyerSpecialization, lawyerCategory, lawyerCity, clientName, onClick }: BookingCardProps) {
  // Fallbacks for missing fields
  const date = booking.scheduledFor || booking.date;
  const time = booking.slot || (date ? new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined);
  const matter = booking.matter || booking.note || '';
  const amount = booking.amount;
  return (
    <Card className="flex flex-col gap-4 border-l-4 border-l-primary/60">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-slate-400">{booking.status}</p>
          <h4 className="font-display text-xl text-accent">{lawyerName}</h4>
          {(lawyerSpecialization || lawyerCategory || lawyerCity) && (
            <div className="text-xs text-slate-500">
              {lawyerSpecialization && <span>{lawyerSpecialization}</span>}
              {lawyerCategory && <span> &middot; {lawyerCategory}</span>}
              {lawyerCity && <span> &middot; {lawyerCity}</span>}
            </div>
          )}
          {clientName && (
            <p className="text-xs text-slate-400">Client: {clientName}</p>
          )}
          <p className="text-sm text-slate-500">{matter}</p>
        </div>
        {onClick ? (
          <button type="button" className="text-primary" onClick={onClick}>
            <ArrowRight className="h-5 w-5" />
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
        {date ? (
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" /> {formatDate(date)}
          </span>
        ) : null}
        {time ? (
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {time}
          </span>
        ) : null}
        {amount ? <span>₹{amount}</span> : null}
      </div>
    </Card>
  );
}

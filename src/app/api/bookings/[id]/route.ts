import { NextResponse } from 'next/server';
import { bookings } from '@/data/mock';

type Params = {
  params: { id: string };
};

export async function GET(_request: Request, { params }: Params) {
  const booking = bookings.find((entry) => entry.id === params.id);
  if (!booking) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }
  return NextResponse.json({ data: booking });
}

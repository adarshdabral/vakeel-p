import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { BookingModel } from '@/models/Booking';

export async function GET() {
  await connectToDatabase();
  const bookings = await BookingModel.find().lean();
  return NextResponse.json({ data: bookings });
}

export async function POST(request: Request) {
  await connectToDatabase();
  const payload = await request.json();
  const { clientId, lawyerId, date, slot, notes } = payload;
  if (!clientId || !lawyerId || !date || !slot) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }
  const booking = await BookingModel.create({
    clientId,
    lawyerId,
    date,
    slot,
    note: notes || '',
    status: 'active',
    rejectionReason: '',
  });
  return NextResponse.json({ data: booking });
}
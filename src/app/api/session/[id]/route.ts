import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { BookingModel } from '@/models/Booking';
// POST /api/session/[id] - verify OTP for booking
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  const { id: bookingId } = await params;
  const { otp } = await request.json();
  if (!otp || !bookingId) {
    return NextResponse.json({ error: 'Missing OTP or bookingId' }, { status: 400 });
  }
  const booking = await BookingModel.findById(bookingId).lean() as any;
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }
  if (booking.otp === otp) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, error: 'Invalid OTP' }, { status: 401 });
  }
}



export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  const { id } = await params;
  const booking = await BookingModel.findById(id).lean();
  if (!booking) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }
  return NextResponse.json({ data: booking });
}

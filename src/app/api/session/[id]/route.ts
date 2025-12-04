import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import { BookingModel } from '@/models/Booking';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  const { id: bookingId } = await params;

  const { otp } = await request.json();
  if (!otp) {
    return NextResponse.json({ error: 'OTP missing' }, { status: 400 });
  }

  const booking: any = await BookingModel.findById(bookingId).lean();
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  if (booking.otp !== otp) {
    return NextResponse.json({ success: false, error: 'Invalid OTP' }, { status: 401 });
  }

  // Create JWT for call room auth
  const token = jwt.sign(
    { bookingId: booking._id, clientId: booking.clientId, lawyerId: booking.lawyerId },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: '1h' }
  );

  return NextResponse.json({
    success: true,
    redirectUrl: `/user/session/${bookingId}/call?token=${token}`
  });
}

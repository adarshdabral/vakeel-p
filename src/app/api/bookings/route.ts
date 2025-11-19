import { NextResponse } from 'next/server';
import { bookings } from '@/data/mock';

export async function GET() {
  return NextResponse.json({ data: bookings });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const created = { id: `booking-${Date.now()}`, status: 'pending', ...payload };
  return NextResponse.json({ data: created });
}

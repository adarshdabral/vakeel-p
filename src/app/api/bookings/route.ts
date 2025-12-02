import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { BookingModel } from '@/models/Booking';
import { verifyAuth, unauthorizedResponse, forbiddenResponse, hasRole } from '@/lib/apiAuth';

// GET /api/bookings?clientId=xxx or ?lawyerId=xxx
export async function GET(request: Request) {
  // Verify authentication
  const user = await verifyAuth(request);
  if (!user) {
    return unauthorizedResponse();
  }

  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');
  const lawyerId = searchParams.get('lawyerId');
  
  let query: any = {};
  
  // Clients can only see their own bookings
  if (user.role === 'client') {
    query.clientId = user.id;
  } 
  // Lawyers can only see bookings assigned to them
  else if (user.role === 'lawyer') {
    if (lawyerId) {
      query.lawyerId = lawyerId;
    } else {
      // Will need lawyer's profile ID - for now allow lawyerId param
      query.lawyerId = lawyerId;
    }
  }
  // Admins can see all bookings
  else if (user.role === 'admin') {
    if (clientId) query.clientId = clientId;
    if (lawyerId) query.lawyerId = lawyerId;
  }

  const bookings = await BookingModel.find(query).lean();
  return NextResponse.json({ data: bookings });
}

// POST /api/bookings
export async function POST(request: Request) {
  // Verify authentication
  const user = await verifyAuth(request);
  if (!user) {
    return unauthorizedResponse();
  }

  // Only clients can create bookings
  if (!hasRole(user, ['client', 'admin'])) {
    return forbiddenResponse('Only clients can create bookings');
  }

  await connectToDatabase();
  const payload = await request.json();
  const { lawyerId, date, slot, note } = payload;
  
  // Validate required fields
  if (!lawyerId || !date || !slot) {
    return NextResponse.json({ error: 'Missing required fields: lawyerId, date, slot' }, { status: 400 });
  }

  // Use authenticated user's ID as clientId (don't trust client-provided clientId)
  const booking = await BookingModel.create({
    clientId: user.id,
    lawyerId,
    date,
    slot,
    note: note || '',
    status: 'pending',
    rejectionReason: '',
  });
  
  return NextResponse.json({ data: booking }, { status: 201 });
}

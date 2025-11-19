import { NextResponse } from 'next/server';
import { users } from '@/data/mock';

export async function GET() {
  return NextResponse.json({ data: users });
}

export async function POST(request: Request) {
  const body = await request.json();
  const created = { ...body, id: `user-${Date.now()}` };
  return NextResponse.json({ data: created });
}

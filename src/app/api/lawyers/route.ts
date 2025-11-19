import { NextResponse } from 'next/server';
import { lawyers } from '@/data/mock';

export async function GET() {
  return NextResponse.json({ data: lawyers });
}

import { NextResponse } from 'next/server';
import { lawyers } from '@/data/mock';

type Params = {
  params: { id: string };
};

export async function GET(_request: Request, { params }: Params) {
  const lawyer = lawyers.find((entry) => entry.id === params.id);
  if (!lawyer) {
    return NextResponse.json({ message: 'Lawyer not found' }, { status: 404 });
  }
  return NextResponse.json({ data: lawyer });
}

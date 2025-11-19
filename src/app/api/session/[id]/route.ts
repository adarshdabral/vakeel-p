import { NextResponse } from 'next/server';
import { sessions } from '@/data/mock';

type Params = {
  params: { id: string };
};

export async function GET(_request: Request, { params }: Params) {
  const session = sessions.find((entry) => entry.id === params.id);
  if (!session) {
    return NextResponse.json({ message: 'Session not found' }, { status: 404 });
  }
  return NextResponse.json({ data: session });
}

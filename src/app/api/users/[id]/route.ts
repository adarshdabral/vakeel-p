import { NextResponse } from 'next/server';
import { users } from '@/data/mock';

type Params = {
  params: { id: string };
};

export async function GET(_request: Request, { params }: Params) {
  const user = users.find((entry) => entry.id === params.id);
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ data: user });
}

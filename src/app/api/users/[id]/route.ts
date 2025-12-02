import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';

type Params = {
  params: { id: string };
};

export async function GET(_request: Request, { params }: Params) {
  await connectToDatabase();
  const user = await UserModel.findById(params.id).lean();
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ data: user });
}

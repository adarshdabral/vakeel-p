import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password, role = 'client', city, category } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required.' }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ message: 'An account with this email already exists.' }, { status: 409 });
    }

    const hashed = await hashPassword(password);
    const user = await UserModel.create({ name, email, password: hashed, role, city, category });

    return NextResponse.json({
      user: user.toJSON(),
      message: 'Registration successful. You can now log in.',
    });
  } catch (error) {
    console.error('Registration error', error);
    return NextResponse.json({ message: 'Unable to register at the moment.' }, { status: 500 });
  }
}

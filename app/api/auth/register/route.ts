import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name } = body;
  if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name: name || null,
      hashedPassword,
      solarCredit: { create: { balance: 0, currency: 'kWh' } },
    },
  });
  return NextResponse.json({ id: user.id, email: user.email });
}

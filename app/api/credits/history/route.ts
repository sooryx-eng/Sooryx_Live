import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { requireSession } from '../../../../lib/auth';

export async function GET(req: Request) {
  let session;
  try {
    session = await requireSession();
  } catch (e: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page') || '1');
  const pageSize = Math.min(100, Number(url.searchParams.get('pageSize') || '20'));
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const transactions = await prisma.creditTransaction.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' }, take: pageSize, skip: (page - 1) * pageSize });
  return NextResponse.json({ transactions });
}

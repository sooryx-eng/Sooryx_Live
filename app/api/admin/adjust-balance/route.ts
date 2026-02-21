import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { requireAdmin } from '../../../../lib/auth';

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch (e: any) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const body = await req.json();
  const { userId, amount, reason } = body;
  if (!userId || typeof amount !== 'number') return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  try {
    const result = await prisma.$transaction(async (tx) => {
      let credit = await tx.solarCredit.findUnique({ where: { userId } });
      if (!credit) credit = await tx.solarCredit.create({ data: { userId, balance: 0 } });
      const newBalance = Number(credit.balance) + amount;
      await tx.solarCredit.update({ where: { id: credit.id }, data: { balance: newBalance } });
      await tx.auditLog.create({ data: { actorId: null, action: 'adjust_balance', meta: { userId, amount, reason }, } });
      await tx.creditTransaction.create({ data: { userId, amount, type: 'admin_adjust', balanceAfter: newBalance, meta: { reason } } });
      return newBalance;
    });
    return NextResponse.json({ balance: result });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Error' }, { status: 500 });
  }
}

import { PrismaClient } from '@prisma/client';

type OpType = 'topup' | 'consume' | 'transfer';

export async function performCreditOperation(
  prisma: PrismaClient,
  userId: string,
  type: OpType,
  amount: number,
  opts?: { idempotencyKey?: string | null; stripeSessionId?: string | null }
) {
  const { idempotencyKey, stripeSessionId } = opts || {};

  // Idempotency: if a transaction exists with the given idempotencyKey or stripeSessionId, return its balance
  if (idempotencyKey) {
    const existing = await prisma.creditTransaction.findUnique({ where: { idempotencyKey } as any });
    if (existing) return { balance: Number(existing.balanceAfter), existing: true };
  }
  if (stripeSessionId) {
    const existing = await prisma.creditTransaction.findUnique({ where: { stripeSessionId } as any });
    if (existing) return { balance: Number(existing.balanceAfter), existing: true };
  }

  const result = await prisma.$transaction(async (tx) => {
    let credit = await tx.solarCredit.findUnique({ where: { userId } });
    if (!credit) {
      credit = await tx.solarCredit.create({ data: { userId, balance: 0 } });
    }
    const current = Number(credit.balance);
    const delta = type === 'topup' ? amount : -amount;
    const newBalance = current + delta;
    if (newBalance < 0) throw new Error('Insufficient balance');
    const updated = await tx.solarCredit.update({ where: { id: credit.id }, data: { balance: newBalance } });
    await tx.creditTransaction.create({
      data: {
        userId,
        amount,
        type,
        balanceAfter: newBalance,
        meta: { idempotencyKey: idempotencyKey ?? null },
        idempotencyKey: idempotencyKey ?? null,
        stripeSessionId: stripeSessionId ?? null,
      },
    });
    return updated;
  });

  return { balance: Number(result.balance), existing: false };
}

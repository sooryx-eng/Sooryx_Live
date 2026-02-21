import { describe, it, expect, vi } from 'vitest';
import { performCreditOperation } from '../lib/credits';

describe('performCreditOperation', () => {
  it('creates credit when missing and topups', async () => {
    const mockPrisma: any = {
      solarCredit: { findUnique: vi.fn().mockResolvedValue(null), create: vi.fn().mockResolvedValue({ id: 'c1', balance: 0 }) },
      creditTransaction: { findUnique: vi.fn().mockResolvedValue(null), create: vi.fn().mockResolvedValue({}) },
      $transaction: vi.fn().mockImplementation(async (fn: any) => fn({
        solarCredit: { findUnique: mockPrisma.solarCredit.findUnique, create: mockPrisma.solarCredit.create, update: vi.fn().mockResolvedValue({ id: 'c1', balance: 10 }) },
        creditTransaction: mockPrisma.creditTransaction,
      })),
    };
    const res = await performCreditOperation(mockPrisma as any, 'u1', 'topup', 10, { idempotencyKey: 'k1' });
    expect(res.balance).toBe(10);
  });

  it('is idempotent with idempotencyKey', async () => {
    const createdTx = { id: 't1', balanceAfter: 10 };
    const mockPrisma2: any = {
      creditTransaction: { findUnique: vi.fn().mockResolvedValue(createdTx) },
    };
    const res = await performCreditOperation(mockPrisma2 as any, 'u1', 'topup', 10, { idempotencyKey: 'k1' });
    expect(res.existing).toBe(true);
    expect(res.balance).toBe(10);
  });
});

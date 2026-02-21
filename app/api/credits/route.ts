import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { performCreditOperation } from "../../../lib/credits";

export async function GET() {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, include: { solarCredit: true } });
  const balance = user?.solarCredit?.balance ?? 0;
  return NextResponse.json({ balance });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { type, amount, idempotencyKey } = body;
  if (!["consume", "topup", "transfer"].includes(type)) return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  const amt = Number(amount);
  if (isNaN(amt) || amt <= 0) return NextResponse.json({ error: "Invalid amount" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  try {
    const op = await performCreditOperation(prisma, user.id, type, amt, { idempotencyKey: idempotencyKey ?? null });
    return NextResponse.json({ balance: op.balance, existing: op.existing });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Error" }, { status: 400 });
  }
}

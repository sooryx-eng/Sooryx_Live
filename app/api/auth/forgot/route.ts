import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { randomBytes, createHash } from "crypto";

export async function POST(req: Request) {
  const body = await req.json();
  const email = String(body?.email || "").toLowerCase();
  if (!email) return NextResponse.json({ ok: true });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ ok: true });

  const token = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
  await prisma.passwordResetToken.create({
    data: {
      tokenHash,
      userId: user.id,
      expiresAt,
    },
  });

  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const resetUrl = `${origin}/auth/reset?token=${token}`;
  console.log("Reset link:", resetUrl);

  return NextResponse.json({ ok: true });
}

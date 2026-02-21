import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { createHash } from "crypto";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const token = String(body?.token || "");
  const password = String(body?.password || "");
  if (!token || !password) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const resetToken = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
  if (!resetToken || resetToken.expiresAt < new Date()) {
    return NextResponse.json({ error: "Token expired or invalid" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);
  await prisma.user.update({ where: { id: resetToken.userId }, data: { hashedPassword } });
  await prisma.passwordResetToken.deleteMany({ where: { userId: resetToken.userId } });

  return NextResponse.json({ ok: true });
}

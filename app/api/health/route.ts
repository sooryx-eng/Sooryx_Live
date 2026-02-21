import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    // Test DB connection
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', message: err?.message ?? 'Database error' },
      { status: 500 }
    );
  }
}

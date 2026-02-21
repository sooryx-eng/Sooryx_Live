import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

export async function requireSession() {
  const session = await getServerSession(authOptions as any);
  if (!session || !session.user) throw new Error('Unauthorized');
  return session;
}

export async function requireAdmin() {
  const session = await requireSession();
  const role = (session as any).user?.role;
  if (role !== 'admin') throw new Error('Forbidden');
  return session;
}

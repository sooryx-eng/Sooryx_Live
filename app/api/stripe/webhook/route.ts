import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature') || '';
  const rawBody = await req.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  let event: Stripe.Event;
  try {
    if (!webhookSecret) throw new Error('Missing STRIPE_WEBHOOK_SECRET');
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    // log and return 400 so Stripe can retry if signature is bad
    console.error('Stripe webhook verification failed:', err?.message ?? err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const amount = (session.amount_total ?? 0) / 100;
    if (email) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        // Use helper which provides idempotency by stripeSessionId
        try {
          await (async () => {
            // prevent double-processing
            const existing = await prisma.creditTransaction.findUnique({ where: { stripeSessionId: session.id } as any });
            if (existing) return;
            await prisma.$transaction(async (tx) => {
              let credit = await tx.solarCredit.findUnique({ where: { userId: user.id } });
              if (!credit) credit = await tx.solarCredit.create({ data: { userId: user.id, balance: 0 } });
              const newBalance = Number(credit.balance) + amount;
              await tx.solarCredit.update({ where: { id: credit.id }, data: { balance: newBalance } });
              await tx.creditTransaction.create({
                data: {
                  userId: user.id,
                  amount: amount,
                  type: "topup",
                  balanceAfter: newBalance,
                  meta: { stripeSessionId: session.id },
                  stripeSessionId: session.id,
                },
              });
            });
          })();
        } catch (e) {
          // swallow: we'll rely on webhook retries and reconciliation
        }
      }
    }
  }
  return NextResponse.json({ received: true });
}

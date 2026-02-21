import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const amount = Number(body.amount) || 500;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });
  const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: { name: 'सोलर क्रेडिट्स' },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/credits?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/credits`,
  });
  return NextResponse.json({ url: session.url });
}

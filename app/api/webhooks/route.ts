import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  return new Stripe(key, {
    apiVersion: '2025-02-24.acacia',
  });
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new NextResponse('Webhook secret not configured', { status: 500 });
  }

  const stripe = getStripeClient();
  const sig = req.headers.get('stripe-signature');
  const buf = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig!, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    event.data.object as Stripe.PaymentIntent;
  } else if (event.type === 'payment_intent.payment_failed') {
    event.data.object as Stripe.PaymentIntent;
  } else if (event.type === 'charge.succeeded') {
    event.data.object as Stripe.Charge;
  }

  return NextResponse.json({ received: true });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}

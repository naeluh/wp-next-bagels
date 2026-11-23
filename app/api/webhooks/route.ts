import Stripe from 'stripe';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // Stripe signs the raw body, so read it as text before any parsing.
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  // Events are acknowledged only; nothing is processed yet
  // (payment_intent.succeeded, payment_intent.payment_failed, charge.succeeded).
  void event;
  return Response.json({ received: true });
}

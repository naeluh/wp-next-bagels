import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config';
import { formatAmountForStripe } from '../../../utils/stripe-helpers';

import Stripe from 'stripe';

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const body = await req.json().catch(() => null);
  if (!body) {
    return Response.json(
      { statusCode: 400, message: 'Invalid JSON' },
      { status: 400 }
    );
  }
  // Create vars from body
  const { amount }: { amount: number } = body;
  const { email }: { email: string } = body;
  const { phone }: { phone: string } = body;
  const { name }: { name: string } = body;
  const { description }: { description: string } = body;

  try {
    // Validate the amount that was passed from the client.
    if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
      throw new Error('Invalid amount.');
    }

    // Validate the email that was passed from the client.
    if (!validateEmail(email)) {
      throw new Error('Invalid email.');
    }

    // Create PaymentIntent from body params.
    const params: Stripe.PaymentIntentCreateParams = {
      allowed_payment_method_types: ['card'],
      amount: formatAmountForStripe(amount, CURRENCY),
      currency: CURRENCY,
      description: description ?? '',
    };

    // Create Customer from body params.
    const paramsCustomer: Stripe.CustomerCreateParams = {
      name: name ?? 'no name',
      email: email ?? 'no email',
      phone: phone ?? 'no phone',
      description: description ?? 'no description',
    };

    // Create payment
    const payment_intent: Stripe.PaymentIntent =
      await stripe.paymentIntents.create(params);

    // List current customers
    const customers = await stripe.customers.list();

    // Check it customer exists
    const existingCustomer = customers.data.filter(
      customer =>
        customer.email === email ||
        customer.phone === phone ||
        customer.name === name
    )[0];

    // if customer exists update or create
    if (!existingCustomer) {
      await stripe.customers.create(paramsCustomer);
    } else {
      await stripe.customers.update(existingCustomer.id, paramsCustomer);
    }

    return Response.json(payment_intent);
  } catch (err) {
    return Response.json(
      { statusCode: 500, message: (err as Error).message },
      { status: 500 }
    );
  }
}

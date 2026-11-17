import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config';
import { formatAmountForStripe } from '../../../utils/stripe-helpers';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(key, {
    apiVersion: '2025-02-24.acacia',
  });
}

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export async function POST(req: Request) {
  const stripe = getStripe();
  try {
    const body = await req.json();
    const {
      amount,
      email,
      phone,
      name,
      description,
    }: {
      amount: number;
      email: string;
      phone: string;
      name: string;
      description: string;
    } = body;

    if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
      throw new Error('Invalid amount.');
    }

    if (!validateEmail(email)) {
      throw new Error('Invalid email.');
    }

    const params: Stripe.PaymentIntentCreateParams = {
      payment_method_types: ['card'],
      amount: formatAmountForStripe(amount, CURRENCY),
      currency: CURRENCY,
      description: description ?? '',
    };

    const paramsCustomer: Stripe.CustomerCreateParams = {
      name: name ?? 'no name',
      email: email ?? 'no email',
      phone: phone ?? 'no phone',
      description: description ?? 'no description',
    };

    const payment_intent = await stripe.paymentIntents.create(params);

    const customers = await stripe.customers.list();

    const existingCustomer = customers.data.filter(
      customer =>
        customer.email === email ||
        customer.phone === phone ||
        customer.name === name
    )[0];

    if (!existingCustomer) {
      await stripe.customers.create(paramsCustomer);
    } else {
      await stripe.customers.update(existingCustomer.id, paramsCustomer);
    }

    return NextResponse.json(payment_intent);
  } catch (err) {
    return NextResponse.json(
      { statusCode: 500, message: (err as Error).message },
      { status: 500 }
    );
  }
}

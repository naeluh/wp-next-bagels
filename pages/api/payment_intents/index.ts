import { NextApiRequest, NextApiResponse } from 'next';

import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config';
import { formatAmountForStripe } from '../../../utils/stripe-helpers';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
});

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { amount }: { amount: number } = req.body;
    const { email }: { email: string } = req.body;
    const { phone }: { phone: string } = req.body;
    const { name }: { name: string } = req.body;
    const { description }: { description: string } = req.body;

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
        payment_method_types: ['card'],
        amount: formatAmountForStripe(amount, CURRENCY),
        currency: CURRENCY,
        description: process.env.STRIPE_PAYMENT_DESCRIPTION ?? '',
        receipt_email: email,
      };

      // Create Customer from body params.
      const paramsCustomer: Stripe.CustomerCreateParams = {
        name: name ?? 'no name',
        email: email ?? 'no email',
        phone: phone ?? 'no phone',
        description: description ?? 'no description',
      };

      const payment_intent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
        params
      );

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

      res.status(200).json(payment_intent);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

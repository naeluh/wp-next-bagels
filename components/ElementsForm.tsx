import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';

import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';

import StripeTestCards from './StripeTestCards';
import PrintObject from './PrintObject';

import { fetchPostJSON, fetchGetJSON } from '../utils/api-helpers';
import { formatAmountForDisplay } from '../utils/stripe-helpers';
import * as config from '../config';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import BagelSetAddRemove from './BagelSetAddRemove';
import BagelChipSetAddRemove from './BagelChipSetAddRemove';

const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      iconColor: '#fad113',
      color: '#000',
      fontWeight: '500',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#000',
      },
      '::placeholder': {
        color: '#000',
      },
    },
    invalid: {
      iconColor: '#000',
      color: '#fad113',
    },
  },
};

const ElementsForm = () => {
  const { action, state } = useStateMachine(updateAction);
  const [input, setInput] = useState({
    customDonation: state.data.totalCost,
    cardholderName: '',
    cardholderEmail: '',
    cardholderPhone: '',
  });
  const [payment, setPayment] = useState({ status: 'initial' });
  const [errorMessage, setErrorMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return <h2>Processing...</h2>;

      case 'requires_action':
        return <h2>Authenticating...</h2>;

      case 'succeeded':
        return <h2>Payment Succeeded 🥳</h2>;

      case 'error':
        return (
          <>
            <h2>Error 😭</h2>
            <p className='error-message'>{errorMessage}</p>
          </>
        );

      default:
        return null;
    }
  };

  const updateBagelChipsQuantity = (chips: any, chipData: any) => {
    if (!chips && !chipData) return false;

    const handleUpdateQuantity = async (id: any, quantity: any) =>
      await fetchGetJSON(`/api/wp?id=${id}&quantity=${quantity}`);

    Object.entries(chips).forEach((chip: any) => {
      chipData.forEach((data: any) => {
        if (chip[0] === data.title) {
          if (chip[1] > 0) {
            const newQuantity = data.quantity - chip[1];
            handleUpdateQuantity(data.id, newQuantity);
          }
        }
      });
    });

    return true;
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = e =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    // Abort if form isn't valid
    if (!e.currentTarget.reportValidity()) return;
    setPayment({ status: 'processing' });

    // Create a PaymentIntent with the specified amount.
    const response = await fetchPostJSON('/api/payment_intents', {
      amount: input.customDonation,
    });
    setPayment(response);

    if (response.statusCode === 500) {
      setPayment({ status: 'error' });
      setErrorMessage(response.message);
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements!.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentIntent } = await stripe!.confirmCardPayment(
      response.client_secret,
      {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: input.cardholderName,
            email: input.cardholderEmail,
            phone: input.cardholderPhone,
          },
        },
      }
    );

    if (error) {
      setPayment({ status: 'error' });
      setErrorMessage(error.message ?? 'An unknown error occured');
    } else if (paymentIntent) {
      setPayment(paymentIntent);
      updateBagelChipsQuantity(state.data.bagelChips, state.data.bagelChipData);
      // Reset Value on 'succeeded'
      action({
        bagelSelections: [],
        bagelChips: {},
        bagelChipData: [],
        location: '',
        time: '',
        totalCost: 0,
      });
    }
  };

  return (
    <>
      <section>
        {state.data.bagelSelections.length > 0 && <p>Bagels:</p>}
        {state.data.bagelSelections.length > 0 &&
          state.data.bagelSelections.map((bagelSelection: any) => (
            <BagelSetAddRemove
              bagelSelection={bagelSelection}
              key={bagelSelection.id}
            />
          ))}
      </section>
      <section>
        {state.data.bagelChips && <p>Bagels Chips:</p>}
        {state.data.bagelChips &&
          Object.entries(state.data.bagelChips).map((key: any, value: any) => (
            <BagelChipSetAddRemove bagelChipKey={key} key={key} />
          ))}
      </section>
      <section className='my-4'>
        <p>
          Pickup Location:{' '}
          {state.data.formattedLocation ? state.data.formattedLocation : ''}
        </p>
        <p>
          Pickup Date:{' '}
          {state.data.formattedDate ? state.data.formattedDate : ''}
        </p>
      </section>
      <form onSubmit={handleSubmit}>
        <StripeTestCards />
        <fieldset className='elements-style'>
          <legend>Your payment details:</legend>
          <input
            placeholder='Cardholder name'
            className='elements-style border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200'
            type='Text'
            name='cardholderName'
            onChange={handleInputChange}
            required
          />
          <input
            placeholder='Cardholder email'
            className='elements-style border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200'
            type='Email'
            name='cardholderEmail'
            onChange={handleInputChange}
            required
          />
          <input
            placeholder='Cardholder phone'
            className='elements-style border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200'
            type='Phone'
            name='cardholderPhone'
            onChange={handleInputChange}
            required
          />
          <div className='FormRow elements-style'>
            <CardElement
              options={CARD_OPTIONS}
              className='elements-style border border-gray-300 p-2 my-4 rounded-md focus:outline-none focus:ring-2 ring-blue-200'
              onChange={e => {
                if (e.error) {
                  setPayment({ status: 'error' });
                  setErrorMessage(
                    e.error.message ?? 'An unknown error occured'
                  );
                }
              }}
            />
          </div>
        </fieldset>
        <button
          className='bg-m-yellow text-white active:bg-yellow-400 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 disabled:opacity-25'
          style={{ transition: 'all .15s ease' }}
          type='submit'
          disabled={
            !['initial', 'succeeded', 'error'].includes(payment.status) ||
            !stripe
          }
        >
          Total: {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
        </button>
      </form>
      <PaymentStatus status={payment.status} />
      <PrintObject content={payment} />
    </>
  );
};

export default ElementsForm;

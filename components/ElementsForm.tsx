import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import desc from '../lib/description';
import { fetchPostJSON, fetchGetJSON } from '../utils/api-helpers';
import { formatAmountForDisplay } from '../utils/stripe-helpers';
import * as config from '../config';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from './Button';
import Input from './Input';
import AddressForm from './AddressForm';
import SuccessfulPaymentResponse from './SuccessfulPaymentResponse';
import OrderDetails from './OrderDetails';

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

const percentage = (partialValue: number, totalValue: number) => {
  return (partialValue / 100) * totalValue;
};

const formatCost = (number: number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

const ElementsForm = () => {
  const router = useRouter();
  const { actions, state } = useStateMachine({ updateAction });
  const stripeFee = formatCost(percentage(2.9, state?.data?.totalCost) + 0.3);
  const processingFee = formatCost(
    state?.data?.brunchBag.bags.length > 0 ? 3 : 1
  );
  const totalFee = stripeFee + processingFee;
  const [input, setInput] = useState({
    customDonation: state?.data?.totalCost + totalFee,
    cardholderName: '',
    cardholderEmail: '',
    cardholderPhone: '',
    addressOne: '',
    addressTwo: '',
    city: '',
    state: '',
    zip: state?.data?.brunchBag.address.zip,
  });
  const [payment, setPayment] = useState({ status: 'initial' });
  const [errorMessage, setErrorMessage] = useState('');
  const [description, setDescription] = useState('');

  // Set state so it can used even though its stale
  const oldState = state?.data;

  const stripe = useStripe();
  const elements = useElements();
  const ref = useRef(null);

  // if total cost is 0 we dont need to checkout.
  // Redirect back to the bagels page
  useEffect(() => {
    setDescription(desc(state));
    if (state?.data?.totalCost === 0) {
      router.push(`/`);
    }
  }, []);

  const forceReflow = (ref: any) => {
    const el = ref.current;

    if (el) {
      const initialDisplay = el.style.display;

      el.style.display = 'none';
      el.offsetHeight;
      el.style.display = initialDisplay;
    }
  };

  useEffect(() => {
    if (stripe && elements) {
      forceReflow(ref);
    }
  }, [stripe, elements, ref]);

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
      name: input.cardholderName,
      email: input.cardholderEmail,
      phone: input.cardholderPhone,
      description: description,
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

      await fetchGetJSON(
        `/api/brunch?day=${
          state?.data?.brunchBag.deliveryDate
        }&bags=${JSON.stringify(state?.data?.brunchBag.bags)}`
      );

      await fetchGetJSON(
        encodeURI(
          `/api/email?desc=${description}&name=${input.cardholderName}&phone=${input.cardholderPhone}&email=${input.cardholderEmail}&time=${oldState.formattedDate}&location=${oldState.formattedLocation}&cost=${input.customDonation}&deliveryDate=${oldState.brunchBag.deliveryDate}&addresOne=${input.addressOne}&addresTwo=${input.addressTwo}&city=${input.city}&state=${input.state}&zip=${input.zip}&fee=${totalFee}`
        )
      );

      updateBagelChipsQuantity(
        state?.data?.bagelChips,
        state?.data?.bagelChipData
      );

      // Reset Value on 'succeeded'
      actions.updateAction({
        bagelSelections: [],
        bagelChips: {},
        bagelChipData: [],
        location: '',
        time: '',
        formattedDate: '',
        formattedLocation: '',
        totalCost: 0,
        brunchBagData: [],
        brunchBag: {
          bags: [],
          deliveryDate: null,
          address: {
            addressOne: null,
            addressTwo: null,
            city: null,
            state: null,
            zip: null,
          },
        },
      });
    }
  };

  return (
    <article>
      {['succeeded'].includes(payment.status) ? (
        <SuccessfulPaymentResponse oldState={oldState} input={input} />
      ) : (
        <>
          <OrderDetails currentState={state} />
          <form onSubmit={handleSubmit} className='mb-8'>
            <fieldset className='elements-style my-4'>
              <AddressForm handleInputChange={handleInputChange} />

              <legend className='text-xl font-serif font-black'>
                Your payment details:
              </legend>

              <Input
                placeholder={'Cardholder name'}
                type={'text'}
                name={'cardholderName'}
                onChange={handleInputChange}
                required
              />

              <Input
                placeholder={'Cardholder email'}
                type={'email'}
                name={'cardholderEmail'}
                onChange={handleInputChange}
                required
              />

              <Input
                placeholder={'Cardholder phone'}
                type={'phone'}
                name={'cardholderPhone'}
                onChange={handleInputChange}
                required
              />

              <span ref={ref}>
                <CardElement
                  options={CARD_OPTIONS}
                  className='bg-white w-full border-8 border-m-black p-4 my-4 block focus:outline-none focus:ring-2 ring-m-yellow'
                  onChange={(e: any) => {
                    if (e.error) {
                      setPayment({ status: 'error' });
                      setErrorMessage(
                        e.error.message ?? 'An unknown error occured'
                      );
                    }
                  }}
                />
              </span>
            </fieldset>
            <PaymentStatus status={payment.status} />
            <p className='mb-4'>Processing Fee:&nbsp;${totalFee.toFixed(2)}</p>
            <p className='text-2xl font-serif'>
              Total:&nbsp;
              <span className=' font-sans'>
                {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
              </span>
            </p>
            <Button
              type={'submit'}
              text={`Pay`}
              disabled={
                !['initial', 'succeeded', 'error'].includes(payment.status) ||
                !stripe
              }
              style={{ transition: 'all .15s ease' }}
              onClick={() => {}}
              fullWidth={false}
            />
          </form>
        </>
      )}

      {/*  <PrintObject content={payment} /> */}
    </article>
  );
};

export default ElementsForm;

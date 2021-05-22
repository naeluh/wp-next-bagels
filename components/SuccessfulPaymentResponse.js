import React, { useEffect } from 'react';
import BagelSetAddRemove from './BagelSetAddRemove';
import BagelChipSetAddRemove from './BagelChipSetAddRemove';
import BrunchBagAddRemove from './BrunchBagAddRemove';

const SuccessfulPaymentResponse = ({ oldState, input }) => {
  const hideBagelChipsHeaderfromOldState =
    Object.values(oldState.bagelChips).reduce((a, b) => a + b, 0) === 0
      ? false
      : true;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className='my-4 flex justify-start items-center border-b-8 border-m-yellow'>
        <p className=' text-3xl font-serif mr-4'>Order Details 🥯</p>
      </section>

      <section className='my-4'>
        <p className=' text-xl my-4'>
          🥳 &nbsp;Payment Succeeded! Thank you for your order! &nbsp;🥳
        </p>
        <p className=' text-xl my-4'>
          A receipt has been emailed to {input.cardholderEmail} with the details
          of your order.
        </p>
      </section>

      <section className='my-4 pt-4 flex justify-start items-center border-t-4 border-m-yellow'>
        <p className=' text-2xl font-serif mr-4'>
          Here is what you ordered &nbsp;🥯
        </p>
      </section>

      {oldState.brunchBag.bags.length > 0 && (
        <section>
          <p className='my-2 text-xl'>Brunch Bag Delivery Info</p>
          <p className='my-2 text-xl'>
            Delivery Date: {oldState.brunchBag.deliveryDate}
          </p>

          <p className='my-2 text-xl'>
            Delivery Address: {input.addressOne} {input.addressTwo} {input.city}{' '}
            {input.state} {input.zip}
          </p>
        </section>
      )}

      {oldState.brunchBag.bags.length > 0 && (
        <section className='my-4'>
          <p className='text-xl'>
            <span className='text-xl font-serif font-black'>Brunch Bags</span>:
          </p>
          {oldState.brunchBag.bags.map(bag => (
            <BrunchBagAddRemove
              show={false}
              bag={bag}
              editGroup={() => {}}
              key={bag.id}
            />
          ))}
        </section>
      )}

      {oldState.bagelSelections.length > 0 ||
        (hideBagelChipsHeaderfromOldState && (
          <section>
            <p className='my-2 text-xl'>
              Please arrive on{' '}
              {oldState.formattedDate ? oldState.formattedDate : ''} at{' '}
              {oldState.formattedLocation ? oldState.formattedLocation : ''} to
              pick up your order.
            </p>
          </section>
        ))}

      {oldState.bagelSelections.length > 0 && (
        <section className='my-4'>
          <p className='text-xl'>
            <span className='text-xl font-serif font-black'>Bagels</span>:
          </p>
          {oldState.bagelSelections.map(bagelSelection => (
            <BagelSetAddRemove
              bagelSelection={bagelSelection}
              key={bagelSelection.id}
              show={false}
              editGroup={() => {}}
            />
          ))}
        </section>
      )}

      {hideBagelChipsHeaderfromOldState && (
        <section>
          {oldState.bagelChips &&
            Object.entries(oldState.bagelChips).map((key, value) => (
              <BagelChipSetAddRemove
                show={false}
                bagelChipKey={key}
                key={key}
              />
            ))}
        </section>
      )}
    </>
  );
};

export default SuccessfulPaymentResponse;

import React from 'react';
import BagelSetAddRemove from './BagelSetAddRemove';
import BagelChipSetAddRemove from './BagelChipSetAddRemove';
import BrunchBagAddRemove from './BrunchBagAddRemove';
import type { GlobalState } from 'little-state-machine';

type Props = {
  currentState: GlobalState;
};

const OrderDetails = ({ currentState }: Props) => {
  const {
    bagelSelections,
    bagelChips,
    formattedLocation,
    formattedDate,
    brunchBag,
  } = currentState?.data;

  const hideBagelChipsHeader =
    Object.values(bagelChips).reduce((a, b) => a + b, 0) === 0 ? false : true;

  return (
    <div className='pt-14'>
      <section className='my-4 border-b-8 border-m-yellow flex justify-start items-center'>
        <p className=' text-3xl font-serif mr-4 text-black'>Cart</p>
      </section>

      {brunchBag.bags.length > 0 && (
        <section className='my-4 border-b-8 border-m-yellow'>
          <p className='my-2 text-xl font-serif font-black'>Brunch Bags:</p>
          {brunchBag.bags.map(bag => (
            <BrunchBagAddRemove
              show={false}
              bag={bag}
              editGroup={() => {}}
              key={bag.id}
            />
          ))}
          <p className='my-4 text-xl'>
            Delivery Date: {brunchBag.deliveryDate}
          </p>
        </section>
      )}

      {bagelSelections.length > 0 && (
        <section className='my-4'>
          <p className='text-xl'>
            <span className='text-xl font-serif font-black'>Bagels</span>:
          </p>

          {bagelSelections.map(bagelSelection => (
            <BagelSetAddRemove
              bagelSelection={bagelSelection}
              key={bagelSelection.id}
              show={false}
              editGroup={() => {}}
            />
          ))}
        </section>
      )}

      {hideBagelChipsHeader && (
        <section>
          <p className='text-xl'>
            <span className='text-xl font-serif font-black'>Bagels Chips</span>:
          </p>
          {bagelChips &&
            Object.entries(bagelChips).map((key, value) => (
              <BagelChipSetAddRemove
                editChipGroup={() => {}}
                show={false}
                bagelChipKey={key}
                key={String(key)}
              />
            ))}
        </section>
      )}

      {!hideBagelChipsHeader ||
        (bagelSelections.length > 0 && (
          <section className='my-4 pb-4 border-b-8 border-m-yellow'>
            <p className='my-2 text-xl'>
              <span className=' text-xl'>Pickup Location</span>:{' '}
              {formattedLocation ? formattedLocation : ''}
            </p>
            <p className='my-2 text-xl'>
              <span className=''>Pickup Date</span>:{' '}
              {formattedDate ? formattedDate : ''}
            </p>
          </section>
        ))}
    </div>
  );
};

export default OrderDetails;

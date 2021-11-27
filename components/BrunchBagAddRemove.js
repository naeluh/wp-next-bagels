import React from 'react';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import Button from './Button';

const BrunchBagAddRemove = ({ editGroup, bag, show }) => {
  const { state, actions } = useStateMachine({ updateAction });
  const removeBagelSet = (array, value) => {
    actions.updateAction({
      brunchBag: {
        ...state.data.brunchBag,
        bags: array.filter(item => {
          return item.id !== value;
        }),
      },
    });
  };

  const bagels = bag.bagels.filter(({ value }) => value > 0);

  const bagDetails =
    bag.type === `small`
      ? '6 Farm Fresh Eggs, and Microgreens'
      : '12 Farm Fresh Eggs, and Microgreens';

  const plural = v => (v >= 2 ? 'bagels' : 'bagel');

  return (
    <div className='my-4'>
      <h4 className='font-serif font-black leading-tight text-lg text-m-black mb-2'>
        {bag.type === `small` ? `Small` : `Large`}
      </h4>
      <p>
        {bagels.map((bagel, index) => (
          <span className='text-lg' key={bagel}>
            {bagel.value} {bagel.key} {plural(bagel.value)}
            {`,`}
            &nbsp;
          </span>
        ))}
        <span className='text-lg'>{bagDetails}</span>
      </p>
      {show && (
        <>
          <p className='inline-block mr-4'>
            <Button
              type={'button'}
              text={'Edit'}
              style={{ transition: 'all .15s ease' }}
              disabled={false}
              fullWidth={false}
              onClick={() => {
                editGroup(bag.type, bag.id);
              }}
            />
          </p>
          <p className='inline-block'>
            <Button
              type={'button'}
              text={'Remove'}
              style={{ transition: 'all .15s ease' }}
              disabled={false}
              fullWidth={false}
              onClick={() => removeBagelSet(state.data.brunchBag.bags, bag.id)}
            />
          </p>
        </>
      )}
    </div>
  );
};

export default BrunchBagAddRemove;

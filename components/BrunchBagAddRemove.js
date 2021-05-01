import React from 'react';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import Button from './Button';

const BrunchBagAddRemove = ({ editGroup, bag, show }) => {
  const { state, actions } = useStateMachine({ updateAction });
  const removeBagelSet = (array, value) => {
    actions.updateAction({
      brunchBag: {
        bags: array.filter(item => {
          return item.id !== value;
        }),
      },
    });
  };

  return (
    <div className='my-4'>
      <h4 className='font-serif font-black leading-tight text-xl text-m-black mb-2'>
        {bag.type === `small` ? `Small` : `Large`}
      </h4>
      <p>
        {bag.bagels.map((bagel, index) => (
          <span className='text-lg' key={bagel}>
            {bagel.key} {bagel.value}
            {bag.bagels.length - 1 !== index && `,`}&nbsp;
          </span>
        ))}
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

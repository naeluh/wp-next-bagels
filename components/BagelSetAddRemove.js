import React from 'react';
import Link from 'next/link';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import Button from './Button';

const BagelSetAddRemove = ({ bagelSelection, show }) => {
  const { state, actions } = useStateMachine({ updateAction });
  const removeBagelSet = (array, value) => {
    actions.updateAction({
      bagelSelections: array.filter(item => {
        return item.id !== value;
      }),
    });
  };

  return (
    <div className='my-4'>
      <h4 className=' font-bold leading-tight text-lg text-m-black mb-2'>
        {bagelSelection.bagelSetType === `halfDozen` ? `Half Dozen` : `Dozen`}
      </h4>
      <p>
        {bagelSelection.bagels.map((bagel, index) => (
          <span className='text-lg'>
            {bagel.key} {bagel.value}
            {bagelSelection.bagels.length - 1 !== index && `,`}&nbsp;
          </span>
        ))}
      </p>
      {show && (
        <>
          <p className='inline-block mr-4'>
            <Link
              href={`/bagels/edit-bagels?bagelSelectionsID=${bagelSelection.id}&type=${bagelSelection.bagelSetType}`}
              as={`/bagels/edit-bagels`}
            >
              <Button
                type={'button'}
                text={'Edit'}
                style={{ transition: 'all .15s ease' }}
                disabled={false}
                fullWidth={false}
              />
            </Link>
          </p>
          <p className='inline-block'>
            <Button
              type={'button'}
              text={'Remove'}
              style={{ transition: 'all .15s ease' }}
              disabled={false}
              fullWidth={false}
              onClick={() =>
                removeBagelSet(state.data.bagelSelections, bagelSelection.id)
              }
            />
          </p>
        </>
      )}
    </div>
  );
};

export default BagelSetAddRemove;

import React from 'react';
import Link from 'next/link';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import Button from './Button';

const BagelChipSetAddRemove = ({ bagelChipKey, show }) => {
  const { state, actions } = useStateMachine({ updateAction });

  const removeBagelChips = (array, bckey) => {
    array[bckey[0]] = 0;
    actions.updateAction({
      bagelChips: array,
    });
  };

  const bags = bagelChipKey[1] > 1 ? `bags` : `bag`;

  const bagelChip =
    bagelChipKey[1] > 0
      ? `${bagelChipKey[0]} Bagel Chips: ${bagelChipKey[1]} ${bags} `
      : ``;

  return bagelChipKey[1] > 0 ? (
    <div className='my-4'>
      <p className='text-lg'>{bagelChip}</p>
      {show && (
        <>
          <p className='inline-block mr-4'>
            <Link href={`/bagel-chips`} as={`/bagel-chips`}>
              <Button
                type={'button'}
                text={'Edit'}
                style={{ transition: 'all .15s ease' }}
                disabled={false}
              />
            </Link>
          </p>
          <p className='inline-block'>
            <Button
              type={'button'}
              text={'Remove'}
              style={{ transition: 'all .15s ease' }}
              disabled={false}
              onClick={() =>
                removeBagelChips(state.data.bagelChips, bagelChipKey)
              }
            />
          </p>
        </>
      )}
    </div>
  ) : (
    <span></span>
  );
};

export default BagelChipSetAddRemove;

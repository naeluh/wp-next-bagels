import React from 'react';
import Link from 'next/link';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';

const BagelChipSetAddRemove = ({ bagelChipKey }) => {
  const { state, action } = useStateMachine(updateAction);

  const removeBagelChips = (array, bckey) => {
    array[bckey[0]] = 0;
    action({
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
      <p>{bagelChip}</p>
      <p>
        <Link href={`/bagel-chips`} as={`/bagel-chips`}>
          Edit
        </Link>
      </p>
      <p>
        <button
          onClick={() => removeBagelChips(state.data.bagelChips, bagelChipKey)}
          type='button'
        >
          Remove
        </button>
      </p>
    </div>
  ) : (
    <span></span>
  );
};

export default BagelChipSetAddRemove;

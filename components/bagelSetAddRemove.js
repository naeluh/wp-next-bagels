import React from 'react';
import Link from 'next/link';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';

const Button = ({ id }) => {
  <button></button>;
};

const bagelSetAddRemove = ({ bagelSelection }) => {
  const { state, action } = useStateMachine(updateAction);
  const removeBagelSet = (array, value) => {
    action({
      bagelSelections: array.filter(item => {
        return item.id !== value;
      }),
    });
    console.log(state);
  };
  return (
    <div className='my-4'>
      <h4>
        {bagelSelection.bagelSetType === `halfDozen` ? `Half Dozen` : `Dozen`}
      </h4>
      <p>
        {bagelSelection.bagels.map(bagel => (
          <span key={bagel.key}>{`${bagel.key} ${bagel.value},`}</span>
        ))}
      </p>
      <p>
        <Link
          href={`/bagels/edit-bagels?bagelSelectionsID=${bagelSelection.id}&type=${bagelSelection.bagelSetType}`}
          as={`/bagels/edit-bagels`}
        >
          Edit
        </Link>
      </p>
      <p>
        <button
          onClick={() =>
            removeBagelSet(state.data.bagelSelections, bagelSelection.id)
          }
          type='button'
        >
          Remove
        </button>
      </p>
    </div>
  );
};

export default bagelSetAddRemove;

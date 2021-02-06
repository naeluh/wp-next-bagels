import React from 'react';
import Link from 'next/link';
import Modal from './modal';
import useRouter from 'next/router';

const bagelSetAddRemove = ({ bagelSelection }) => {
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
        <Modal />
        <Link
          href={`/bagels/remove-bagels?bagelSelectionsID=${bagelSelection.id}&type=${bagelSelection.bagelSetType}`}
          as={`/bagels/remove-bagels`}
        >
          Remove
        </Link>
      </p>
    </div>
  );
};

export default bagelSetAddRemove;

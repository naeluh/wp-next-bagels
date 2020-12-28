import React from 'react';
import Link from 'next/link';
import useRouter from 'next/router';

const bagelSetAddRemove = ({ bagelSelection }) => {
  return (
    <div>
      <h4>{bagelSelection.bagelSetType}</h4>
      <p>
        {bagelSelection.bagels.map(bagel => (
          <span>{`${bagel.key} ${bagel.value},`}</span>
        ))}
      </p>
      <p>
        <Link
          href={`/bagels/edit-bagels?bagelSelectionsID=${bagelSelection.id}`}
          as={`/bagels/edit-bagels`}
        >
          Edit
        </Link>
      </p>
      <p>
        <Link
          href={`/bagels/remove-bagels?bagelSelectionsID=${bagelSelection.id}`}
          as={`/bagels/remove-bagels`}
        >
          Remove
        </Link>
      </p>
    </div>
  );
};

export default bagelSetAddRemove;

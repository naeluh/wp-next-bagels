import React from 'react';

const time = ({ time }) => {
  return (
    <ul>
      <li className='text-1xl md:text-2xl tracking-tighter leading-tight md:pr-8 font-sans mb-4'>
        <p>{time.textDate}</p>
      </li>
      <li className='text-1xl md:text-2xl tracking-tighter leading-tight md:pr-8 font-sans mb-4'>
        <p>{time.dateAndTime}</p>
      </li>
    </ul>
  );
};

export default time;

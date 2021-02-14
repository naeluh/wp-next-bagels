import React from 'react';

const Time = ({ time }) => {
  return (
    <div>
      {time.textDate && (
        <p className='text-base font-normal tracking-tighter leading-tight md:pr-8 font-sans mb-4'>
          {time.textDate}{' '}
        </p>
      )}

      {time.dateAndTime && (
        <p className='text-base font-normal tracking-tighter leading-tight md:pr-8 font-sans mb-4'>
          {time.dateAndTime}
        </p>
      )}
    </div>
  );
};

export default Time;

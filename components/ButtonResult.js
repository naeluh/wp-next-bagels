import React from 'react';

const ButtonResult = ({ data, reset, defaultValues, totalBagels, amount }) => (
  <>
    {totalBagels === amount && (
      <button
        type='submit'
        className='my-4 button bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
        style={{ transition: 'all .15s ease' }}
        disabled={totalBagels === amount ? false : true}
      >
        submit
      </button>
    )}
  </>
);

export default ButtonResult;

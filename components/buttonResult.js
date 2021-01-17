import React from 'react';

const ButtonResult = ({ data, reset, defaultValues, totalBagels, amount }) => (
  <>
    {data && (
      <pre style={{ textAlign: 'left' }}>{JSON.stringify(data, null, 2)}</pre>
    )}
    {/* <button
      className='button buttonBlack'
      type='button'
      onClick={() => {
        reset(defaultValues);
      }}
    >
      Reset Form
    </button> */}
    {totalBagels} {amount}
    {totalBagels === amount && (
      <button
        className={`button`}
        variant='contained'
        type='submit'
        disabled={totalBagels === amount ? false : true}
      >
        submit
      </button>
    )}
  </>
);

export default ButtonResult;

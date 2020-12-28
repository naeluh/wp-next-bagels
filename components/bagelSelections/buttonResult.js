import React from 'react';

const ButtonResult = ({ data, reset, defaultValues }) => (
  <>
    {data && (
      <pre style={{ textAlign: 'left' }}>{JSON.stringify(data, null, 2)}</pre>
    )}

    <button className='button'>submit</button>
  </>
);

export default ButtonResult;

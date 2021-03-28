import React from 'react';
import Button from './Button';

const ButtonResult = ({ data, reset, defaultValues, totalBagels, amount }) => (
  <>
    <Button
      type={'submit'}
      text={'Submit Bagel Choices'}
      style={{ transition: 'all .15s ease' }}
      disabled={totalBagels === amount ? false : true}
      fullWidth
    />
  </>
);

export default ButtonResult;

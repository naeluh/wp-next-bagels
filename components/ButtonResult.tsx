import React from 'react';
import type { FieldValues, UseFormReset } from 'react-hook-form';
import Button from './Button';

type Props = {
  data: unknown;
  reset: UseFormReset<FieldValues>;
  defaultValues: Record<string, number>;
  totalBagels: number;
  amount: number;
};

const ButtonResult = ({
  data,
  reset,
  defaultValues,
  totalBagels,
  amount,
}: Props) => (
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

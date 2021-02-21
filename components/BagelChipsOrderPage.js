import React from 'react';
import { useForm } from 'react-hook-form';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import BagelChipNumberField from './BagelChipNumberField';
import Button from './Button';

const BagelChipsOrderPage = ({ bagelChipsData }) => {
  const router = useRouter();
  const { state, actions } = useStateMachine({ updateAction });
  const defaultValues = {
    bagelChipVal: 0,
  };

  const { handleSubmit, errors, register, setValue } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = data => {
    actions.updateAction({
      bagelChips: data,
    });
    router.replace(`/bagels`, `/bagels`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className='flex-col md:flex-column flex md:justify-between mb-16 md:mb-12'>
        {bagelChipsData &&
          bagelChipsData.map(bagelChip => {
            return bagelChip.node.bagelChipsDetails
              .isThisBagelChipTypeAvailable !== null ||
              bagelChip.node.bagelChipsDetails.quantity > 0 ? (
              <BagelChipNumberField
                register={register}
                defaultValues={defaultValues}
                bagelChip={bagelChip}
                key={bagelChip.node.databaseId}
                errors={errors}
                setValue={setValue}
                state={state}
              />
            ) : (
              <span></span>
            );
          })}
      </section>
      <section className='flex-col md:flex-column flex md:justify-between mb-16 md:mb-12'>
        <Button
          type={'submit'}
          text={'Submit'}
          disabled={false}
          style={{ transition: 'all .15s ease' }}
        />
      </section>
    </form>
  );
};

export default BagelChipsOrderPage;

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import BagelChipNumberField from './BagelChipNumberField';
import Button from './Button';
import Link from 'next/link';

const BagelChipsOrderPage = ({ bagelChipsData }) => {
  const router = useRouter();
  const { state, actions } = useStateMachine({ updateAction });
  const defaultValues = {
    bagelChipVal: 0,
  };
  const [allBagelChipsEmpty, setAllBagelChipsEmpty] = useState(false);

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

  useEffect(() => {
    setAllBagelChipsEmpty(
      bagelChipsData.filter(
        bagelChip =>
          bagelChip.node.bagelChipsDetails.quantity > 0 &&
          bagelChip.node.bagelChipsDetails.quantity !== null
      ).length === 0
    );
  }, []);

  return (
    <>
      {!allBagelChipsEmpty ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className='flex-col md:flex-column flex md:justify-between'>
            {bagelChipsData &&
              bagelChipsData.map(bagelChip => {
                return (bagelChip.node.bagelChipsDetails
                  .isThisBagelChipTypeAvailable !== null &&
                  bagelChip.node.bagelChipsDetails.quantity > 0) ||
                  bagelChip.node.bagelChipsDetails.quantity !== null ? (
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
              fullWidth={false}
            />
          </section>
        </form>
      ) : (
        <section className='flex-col md:flex-column flex md:justify-between mb-16 md:mb-12'>
          <span className='font-serif font-bold leading-tight text-lg text-m-black'>
            No bagel chips are available currently, try back again later. Thanks
            !
          </span>
          <Link href={`/bagels`} as={`/bagels`}>
            <Button
              type={'button'}
              text={'Back to Bagel order page!'}
              style={{ transition: 'all .15s ease' }}
              disabled={false}
              fullWidth={false}
            />
          </Link>
        </section>
      )}
    </>
  );
};

export default BagelChipsOrderPage;

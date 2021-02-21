import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './bagelSelections.module.css';
import ButtonsResult from './ButtonResult';
import BagelNumberField from './BagelNumberField';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';

const BagelSelections = ({ bagelData, pricing }) => {
  const router = useRouter();
  const { actions, state } = useStateMachine({ updateAction });
  const [data] = useState(null);
  const [type, setType] = useState('');
  const [id, setId] = useState('');

  const defaultValues = {
    dozen: 12,
    halfDozen: 6,
    bagelVal: 0,
    totalbagels: 0,
  };

  const { handleSubmit, errors, control, reset, getValues, setValue } = useForm(
    {
      defaultValues,
    }
  );

  const [totalBagels, setTotalBagels] = useState(defaultValues.totalbagels);

  const amount =
    type === 'dozen' ? defaultValues.dozen : defaultValues.halfDozen;

  // console.log(state.data, router);

  const bagelSet =
    state.data.bagelSelections &&
    router.query &&
    state.data.bagelSelections.filter(bagelSelection => {
      return bagelSelection.id === router.query.bagelSelectionsID;
    })[0];

  const onSubmit = data => {
    const vals = getValues();
    const output = Object.entries(vals).map(([key, value]) => ({ key, value }));
    state.data.bagelSelections[router.query.bagelSelectionsID] = {
      id: router.query.bagelSelectionsID,
      bagelSetType: router.query.type,
      bagels: output,
    };
    actions.updateAction({
      bagelSelections: state.data.bagelSelections,
    });
    router.push(`/bagels`);
  };

  useEffect(() => {
    if (!router.query) {
      router.push(`/bagels`);
    }
    if (bagelSet) {
      setType(bagelSet.bagelSetType);
      setId(bagelSet.id);
    } else if (router.query.bagelSelectionsID) {
      setType(router.query.type);
      setId(router.query.bagelSelectionsID);
    } else {
      router.push(`/bagels`);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`form ${styles.bagelForm}`}
    >
      <section className='flex-col md:flex-column flex md:justify-between mb-16 md:mb-12'>
        <h5 className='text-lg font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-black'>
          Let's add some bagels for {` ${type}  ${id}`}
        </h5>
        <h6 className={`${totalBagels === amount ? styles.limit : ``}`}>
          Total Bagels: {totalBagels}
        </h6>
        <p>
          {totalBagels === amount &&
            `You have reached the limit of ${amount}, reduced the amount of one of your selections or go back and add another dozen or half dozen`}
        </p>
      </section>
      <section className='flex-col md:flex-column flex md:justify-between mb-16 md:mb-12'>
        {bagelData &&
          bagelData.map(bagel => (
            <BagelNumberField
              bagelSet={bagelSet}
              amount={amount}
              totalBagels={totalBagels}
              setTotalBagels={setTotalBagels}
              control={control}
              bagel={bagel}
              defaultValues={defaultValues}
              key={bagel.node.bagelInfo.bagelTitle}
            />
          ))}
      </section>

      {errors.exampleRequired && <span>This field is required</span>}
      <ButtonsResult {...{ data, reset, defaultValues, totalBagels, amount }} />
    </form>
  );
};

export default BagelSelections;

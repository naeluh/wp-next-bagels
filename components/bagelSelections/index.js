import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './bagelForm.module.css';
import ButtonsResult from './buttonResult';
import BagelNumberField from '../bagelNumberField';
import updateAction from '../../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';

const bagelForm = ({ bagelData }) => {
  const { state, action } = useStateMachine(updateAction);
  const [data, setData] = useState(null);
  const [type, setType] = useState('');
  const [id, setId] = useState('');
  console.log(state, action);
  const router = useRouter();

  const defaultValues = {
    dozen: 12,
    halfDozen: 6,
    bagelVal: 0,
  };

  const {
    handleSubmit,
    errors,
    control,
    register,
    reset,
    getValues,
    setValue,
  } = useForm({
    defaultValues,
  });

  const onSubmit = data => {
    const vals = getValues();
    const bagelSet =
      state && router.query
        ? state.data.bagelSelections.filter(
            bagelSelection =>
              bagelSelection.id === Number(router.query.bagelSelectionsID)
          )[0]
        : console.error(new Error(`Something went wrong`));
    const output = Object.entries(vals).map(([key, value]) => ({ key, value }));
    state.data.bagelSelections[bagelSet.id - 1].bagels = output;
    router.push(`/bagels`);
  };

  useEffect(() => {
    const bagelSet =
      state.data.bagelSelections &&
      router.query &&
      state.data.bagelSelections.filter(
        bagelSelection =>
          bagelSelection.id === Number(router.query.bagelSelectionsID)
      )[0];

    if (bagelSet) {
      setType(bagelSet.bagelSetType);
      setId(bagelSet.id);
    } else {
      router.push(`/bagels`);
    }
    return () => {};
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`form ${styles.bagelForm}`}
    >
      <section>
        <h5 className='text-lg font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-black'>
          Let's add some bagels for {` ${type}  ${id}`}
        </h5>
        <label>Select Bagels</label>
        {bagelData &&
          bagelData.map(bagel => (
            <BagelNumberField
              register={register}
              control={control}
              bagel={bagel}
              defaultValues={defaultValues}
              getValues={getValues}
              setValue={setValue}
              key={bagel.node.bagelInfo.bagelTitle}
            />
          ))}
      </section>

      <section>
        <pre style={{ textAlign: 'left' }}>
          {JSON.stringify(state.data.bagelSelections, null, 2)}
        </pre>
      </section>

      {errors.exampleRequired && <span>This field is required</span>}
      <ButtonsResult {...{ data, reset, defaultValues }} />
    </form>
  );
};

export default bagelForm;

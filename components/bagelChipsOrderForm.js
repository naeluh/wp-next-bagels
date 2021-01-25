import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import styles from './addGroupsForm.module.css';
import { Button, FormControl, makeStyles, MenuItem } from '@material-ui/core';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import BagelSetAddRemove from './bagelSetAddRemove';
import SelectList from './selectList';
import BagelChipNumberField from './bagelChipNumberField';

const bagelChipsOrderForm = ({ pricing, bagelChipsData }) => {
  const { state, action } = useStateMachine(updateAction);

  const defaultValues = {
    bagelChipVal: 0,
  };

  const {
    handleSubmit,
    errors,
    setError,
    clearErrors,
    control,
    register,
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = data => {
    action({
      bagelChips: data,
    });
  };

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'test',
    }
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className='flex-col md:flex-column flex md:justify-between mb-16 md:mb-12'>
        {bagelChipsData &&
          bagelChipsData.map(bagelChip => (
            <BagelChipNumberField
              register={register}
              defaultValues={defaultValues}
              bagelChip={bagelChip}
              key={bagelChip.node.title}
              errors={errors}
              setValue={setValue}
              state={state}
            />
          ))}
      </section>
      <section className='flex-col md:flex-column flex md:justify-between mb-16 md:mb-12'>
        <Button variant='outlined' type='submit'>
          Ok
        </Button>
      </section>
    </form>
  );
};

export default bagelChipsOrderForm;

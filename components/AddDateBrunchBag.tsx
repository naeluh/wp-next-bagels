'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import type { SelectInstance, SingleValue } from 'react-select';
import styles from './addGroupsForm.module.css';

import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import SelectList from './SelectList';
import Modal from './Modal';
import Button from './Button';
import type { Option } from '../lib/types';

type Props = {
  dates?: Option[];
};

type FormValues = { DeliveryDate: Option | null };

const AddDateBrunchBag = ({ dates }: Props) => {
  const dRef = useRef<SelectInstance<Option, false>>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormValues>({ mode: 'onChange' });

  const { state, actions } = useStateMachine({ actions: { updateAction } });
  const [date, setDate] = useState<Option | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDChange = (selectedOption: SingleValue<Option>) => {
    setValue('DeliveryDate', selectedOption);
    setDate(selectedOption);
  };

  useEffect(() => {
    const saved = state.data.brunchBag.deliveryDate;
    if (saved) {
      // The cart stores the date's label; restore the matching select option so
      // re-submitting without a new pick keeps the date.
      const option = dates?.find(d => d.label === saved) ?? {
        label: saved,
        value: saved,
      };
      setValue('DeliveryDate', option);
      setDate(option);
    } else {
      setShowModal(true);
    }
  }, [state.data.brunchBag.deliveryDate, dates, setValue]);

  const onSubmit = (data: FormValues) => {
    actions.updateAction({
      brunchBag: {
        ...state.data.brunchBag,
        deliveryDate: data.DeliveryDate!.label,
      },
    });
    setShowModal(false);
  };

  return (
    <Modal
      button={`Edit Date`}
      title={`Delivery Date`}
      setShowModal={setShowModal}
      showModal={showModal}
      hideCloseButton={true}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`form ${styles.bagelForm}`}
      >
        <section>
          <SelectList
            id='DeliveryDate'
            label='Select Date'
            handleChange={handleDChange}
            value={date}
            name='DeliveryDate'
            control={control}
            rules={{ required: true }}
            options={dates}
            ref={dRef}
            placeholder={'Select Delivery Date'}
            noOptionsMessage={() => 'No Delivery Dates Available'}
          />
          {errors.DeliveryDate?.type === 'required' && (
            <p className='text-m-red'>Delivery Date is required</p>
          )}
        </section>

        <Button
          type={'submit'}
          style={{ transition: 'all .15s ease' }}
          text={'Ok'}
          disabled={false}
          fullWidth
        />
      </form>
    </Modal>
  );
};

export default AddDateBrunchBag;

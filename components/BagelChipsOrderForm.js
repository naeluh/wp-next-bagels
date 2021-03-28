import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import styles from './addGroupsForm.module.css';
import { Button } from '@material-ui/core';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import BagelChipNumberField from './BagelChipNumberField';
import Modal from './Modal';

const BagelChipsOrderForm = ({ pricing, bagelChipsData }) => {
  const { state, actions } = useStateMachine({ updateAction });
  const [showModal, setShowModal] = useState(false);
  const defaultValues = {
    bagelChipVal: 0,
  };

  const { handleSubmit, errors, control, register, setValue } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = data => {
    actions.updateAction({
      bagelChips: data,
    });
    setShowModal(!showModal);
  };

  return (
    <Modal
      button={`Add Bagel Chips`}
      title={`Select Bagel Chips`}
      setShowModal={setShowModal}
      showModal={showModal}
      hideButton={true}
    >
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
    </Modal>
  );
};

export default BagelChipsOrderForm;

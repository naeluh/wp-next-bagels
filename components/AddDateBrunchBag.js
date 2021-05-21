import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { bagelForm } from './addGroupsForm.module.css';
import { makeStyles } from '@material-ui/core';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import SelectList from './SelectList';
import Modal from './Modal';
import Button from './Button';
import zipcodes from '../utils/zipcodes';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: '100%',
  },
}));

const AddDateBrunchBag = ({ dates }) => {
  const dRef = useRef(null);
  const classes = useStyles();
  const defaultValues = {
    dozen: 12,
    halfDozen: 6,
    bagelPickupDates: '',
    bagelPickupLocations: '',
  };

  const { handleSubmit, errors, control, setValue, getValues } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const { state, actions } = useStateMachine({ updateAction });
  const [date, setDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleDChange = selectedOption => {
    setValue('DeliveryDate', selectedOption);
    setDate(selectedOption);
  };

  useEffect(() => {
    if (state.data.brunchBag.deliveryDate) {
      setValue('DeliveryDate', state.data.brunchBag.deliveryDate);
      setDate(state.data.brunchBag.deliveryDate);
    } else {
      setShowModal(true);
    }
  });

  const onSubmit = data => {
    actions.updateAction({
      brunchBag: {
        ...state.data.brunchBag,
        deliveryDate: data.DeliveryDate.label,
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
      <form onSubmit={handleSubmit(onSubmit)} className={`form ${bagelForm}`}>
        <section>
          <SelectList
            id='DeliveryDate'
            label='Select Date'
            handleChange={handleDChange}
            value={date}
            name='DeliveryDate'
            className={classes.formControl}
            control={control}
            rules={{ required: true }}
            options={dates}
            ref={dRef}
            placeholder={'Select Delivery Date'}
          />
          {errors.DeliveryDate?.type === 'required' && (
            <p style={{ color: 'red' }}>Delivery Date is required</p>
          )}
        </section>

        <section>
          <SelectList
            id='Zipcodes'
            label='Check your zipcode'
            handleChange={handleDChange}
            value={zipcodes()[0]}
            name='Zipcodes'
            className={classes.formControl}
            control={control}
            rules={{ required: true }}
            options={zipcodes()}
            placeholder={'Check your zipcode'}
          />
          {errors.Zipcodes?.type === 'required' && (
            <p style={{ color: 'red' }}>Delivery Date is required</p>
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

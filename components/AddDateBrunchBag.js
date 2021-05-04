import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { bagelForm } from './addGroupsForm.module.css';
import { makeStyles } from '@material-ui/core';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import SelectList from './SelectList';
import Modal from './Modal';
import Button from './Button';
import moment from 'moment';

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

  const convertDateArray = string => {
    let array = string.replace(/\n/g, ' ').split(' ');
    array = array.map(item => new Date(item));
    return array;
  };

  const handleDChange = selectedOption => {
    setValue('DeliveryDate', selectedOption);
    setDate(selectedOption);
  };

  //let start = moment(this.absence.FromDate);
  //let end = moment(this.absence.ToDate);

  // Test values
  let start = moment();
  let end = moment().add(28, 'd');

  let arr = [];
  let tmp = start.clone().day(0);

  if (tmp.isAfter(start, 'd')) {
    arr.push(tmp.format('dddd, MMMM D, YYYY'));
  }

  while (tmp.isBefore(end)) {
    tmp.add(7, 'days');
    arr.push({
      value: tmp.format('DD-MMM-YYYY'),
      label: tmp.format('dddd, MMMM D, YYYY'),
    });
  }

  if (
    !moment().isBetween(moment().day(-6), moment().day(4)) ||
    moment().isSame(moment().day(4))
  ) {
    arr.shift();
  }

  useEffect(() => {
    if (state.data.brunchBag.deliveryDate) {
      setValue('BagelPickupDate', state.data.brunchBag.deliveryDate);
      setDate(state.data.brunchBag.deliveryDate);
    } else {
      setShowModal(true);
    }
    return () => {};
  }, []);

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
            options={arr}
            ref={dRef}
            placeholder={'Select Delivery Date'}
          />
          {errors.BagelPickupDate?.type === 'required' && (
            <p style={{ color: 'red' }}>Date is required</p>
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

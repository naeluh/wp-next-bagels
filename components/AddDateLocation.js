import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { bagelForm } from './addGroupsForm.module.css';
import { makeStyles } from '@material-ui/core';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import SelectList from './SelectList';
import Modal from './Modal';
import Button from './Button';

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

const AddDateLocation = ({ dates, locations }) => {
  const lRef = useRef(null);
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
  const [location, setLocation] = useState('');
  const [dateError, setDateError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [dateOptions, setDateOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const locationOptions = locations.map(location => {
    return {
      label: location.label,
      value: location.value,
    };
  });

  const convertDateArray = string => {
    let array = string.replace(/\n/g, ' ').split(' ');
    array = array.map(item => new Date(item));
    return array;
  };

  const blackOutDates = locations.map(location => {
    return {
      dates: convertDateArray(location.locationData.blackoutDates),
      location: location.value,
    };
  });

  const checkDate = (location, dates) => {
    let bods = blackOutDates.filter(bod => location === bod.location)[0].dates;
    bods = bods.map(b => new Date(b).getTime());
    dates = dates.filter(
      date => !bods.includes(new Date(date.value).getTime())
    );
    setDateOptions(dates);
  };

  const handleLChange = selectedOption => {
    setLocationError(false);
    setValue('BagelPickupLocation', selectedOption);
    setLocation(selectedOption);
    setValue('BagelPickupDate', '');
    setDate('');
    dRef.current.select.clearValue();
    checkDate(selectedOption.value, dates);
  };

  const handleDChange = selectedOption => {
    const values = getValues();
    setLocationError(false);
    if (values.BagelPickupLocation) {
      setValue('BagelPickupDate', selectedOption);
      setDate(selectedOption);
    } else {
      setLocationError(true);
    }
  };

  useEffect(() => {
    if (state.data.location && state.data.time) {
      setValue('BagelPickupLocation', state.data.location);
      setValue('BagelPickupDate', state.data.time);
      setLocation(state.data.location);
      setDate(state.data.time);
    } else {
      setShowModal(true);
    }
    return () => {};
  }, []);

  const onSubmit = data => {
    actions.updateAction({
      location: data.BagelPickupLocation,
      time: data.BagelPickupDate,
      formattedDate: data.BagelPickupDate.label,
      formattedLocation: data.BagelPickupLocation.label,
    });
    setShowModal(false);
  };

  return (
    <Modal
      button={`Edit Pickup Location and date`}
      title={`Pickup Location and date`}
      setShowModal={setShowModal}
      showModal={showModal}
      hideCloseButton={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={`form ${bagelForm}`}>
        <section>
          <SelectList
            id='BagelPickupLocation'
            label='Select Location'
            handleChange={handleLChange}
            value={location}
            name='BagelPickupLocation'
            className={classes.formControl}
            control={control}
            rules={{ required: true }}
            options={locationOptions}
            ref={lRef}
            placeholder={'Select Pickup Location'}
          />
          {locationError && (
            <p style={{ color: 'red', fontWeight: 400 }}>{'Set Location'}</p>
          )}
          {errors.BagelPickupLocation?.type === 'required' &&
            'Location is required'}
        </section>

        <section>
          <SelectList
            id='BagelPickupDate'
            label='Select Date'
            handleChange={handleDChange}
            value={date}
            name='BagelPickupDate'
            className={classes.formControl}
            control={control}
            rules={{ required: true }}
            options={dateOptions}
            ref={dRef}
            placeholder={'Select Pickup Date'}
          />
          {dateError && (
            <p style={{ color: 'red' }}>{'Date is not available'}</p>
          )}
          {errors.BagelPickupDate?.type === 'required' && 'Date is required'}
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

export default AddDateLocation;

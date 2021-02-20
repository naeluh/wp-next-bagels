import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './addGroupsForm.module.css';
import { makeStyles, MenuItem } from '@material-ui/core';
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
    margin: theme.spacing(1),
    minWidth: '100%',
  },
}));

const AddDateLocation = ({ dates, locations }) => {
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

  const { state, action } = useStateMachine(updateAction);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [dateError, setDateError] = useState(false);
  const [locationError, setLocationError] = useState(false);

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

  const checkDate = () => {
    const values = getValues();
    let dates = blackOutDates.filter(
      bod => values.BagelPickupLocation === bod.location
    )[0].dates;
    let isDateBad = dates.filter(
      date => date.getTime() === new Date(values.BagelPickupDate).getTime()
    );
    let check = isDateBad.length > 0 ? true : false;
    return check;
  };

  const convertLocation = (location, locations) =>
    locations.filter(l => location === l.value)[0].label;

  const convertDateFormat = date =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const handleLChange = (event, type) => {
    setDateError(false);
    setLocationError(false);
    setValue('BagelPickupLocation', event.target.value);
    if (checkDate(getValues())) {
      setValue('BagelPickupDate', '');
      setDateError(true);
    }
  };

  const handleDChange = (event, type) => {
    const values = getValues();
    if (values.BagelPickupLocation !== '') {
      setDateError(false);
      setValue('BagelPickupDate', event.target.value);
      if (checkDate(getValues())) {
        setValue('BagelPickupDate', '');
        setDateError(true);
      }
    } else {
      setLocationError(true);
      setValue('BagelPickupDate', '');
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
    action({
      location: data.BagelPickupLocation,
      time: data.BagelPickupDate,
      formattedDate: convertDateFormat(data.BagelPickupDate),
      formattedLocation: convertLocation(data.BagelPickupLocation, locations),
    });
    setShowModal(false);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <Modal
      button={`Edit Pickup Location and Pickup date`}
      title={`Edit Pickup Location and Pickup date`}
      setShowModal={setShowModal}
      showModal={showModal}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`form ${styles.bagelForm}`}
      >
        <section>
          <SelectList
            id='BagelPickupLocation'
            label='Select Location'
            handleChange={e => handleLChange(e, 'location')}
            value={location}
            name='BagelPickupLocation'
            className={classes.formControl}
            control={control}
            defaultValue={location || ''}
            variant='outlined'
            margin='normal'
            rules={{ required: true }}
          >
            {locations &&
              locations.map(location => (
                <MenuItem key={location.value} value={location.value}>
                  {location.label}
                </MenuItem>
              ))}
          </SelectList>
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
            handleChange={e => handleDChange(e, 'date')}
            value={date}
            name='BagelPickupDate'
            className={classes.formControl}
            control={control}
            defaultValue={date || ''}
            variant='outlined'
            margin='normal'
            rules={{ required: true }}
          >
            {dates &&
              dates.map(date => (
                <MenuItem key={date.value} value={date.value}>
                  {date.label}
                </MenuItem>
              ))}
          </SelectList>
          {dateError && (
            <p style={{ color: 'red' }}>{'Date is not available'}</p>
          )}
          {errors.BagelPickupDate?.type === 'required' && 'Date is required'}
        </section>
        <Button
          type={'Ok'}
          style={{ transition: 'all .15s ease' }}
          text={'Checkout'}
          disabled={false}
        />
      </form>
    </Modal>
  );
};

export default AddDateLocation;

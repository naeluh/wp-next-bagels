import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './addGroupsForm.module.css';
import { Button, FormControl, makeStyles, MenuItem } from '@material-ui/core';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import BagelSetAddRemove from './bagelSetAddRemove';
import SelectList from './selectList';

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

const addDateLocation = ({ dates, locations }) => {
  const classes = useStyles();

  const defaultValues = {
    dozen: 12,
    halfDozen: 6,
    bagelPickupDates: '',
    bagelPickupLocations: '',
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

  const { state, action } = useStateMachine(updateAction);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [dateError, setDateError] = useState(false);

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

    console.log(isDateBad);

    let check = isDateBad.length > 0 ? true : false;

    return check;
  };

  const handleLChange = (event, type) => {
    setDateError(false);
    setValue('BagelPickupLocation', event.target.value);
    if (checkDate(getValues())) {
      setValue('BagelPickupDate', '');
      setDateError(true);
    }
    /* handleSubmit(data => {
      console.log('data', data);
      action(data);
    })(); */
  };

  const handleDChange = (event, type) => {
    setDateError(false);
    setValue('BagelPickupDate', event.target.value);
    if (checkDate(getValues())) {
      setValue('BagelPickupDate', '');
      setDateError(true);
    }
    /* handleSubmit(data => {
      console.log('data', data);
      action(data);
    })(); */
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    state.data.BagelPickupLocation &&
      setValue('BagelPickupLocation', state.data.BagelPickupLocation);
    state.data.BagelPickupDate &&
      setValue('BagelPickupDate', state.data.BagelPickupDate);
    return () => {};
  }, []);

  const onSubmit = data => {
    action({
      location: data.BagelPickupLocation,
      time: data.BagelPickupDate,
    });
  };

  console.log('Errors:', errors);

  return (
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

        {dateError && <p style={{ color: 'red' }}>{'Date is not available'}</p>}
        {errors.BagelPickupDate?.type === 'required' && 'Date is required'}
      </section>

      <Button variant='outlined' type='submit'>
        Ok
      </Button>
    </form>
  );
};

export default addDateLocation;

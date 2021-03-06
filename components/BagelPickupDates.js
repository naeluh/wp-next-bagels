import React, { useState, useEffect } from 'react';
import { MenuItem, makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import SelectList from './SelectList';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
}));

const BagelPickupDates = ({ dates, locations, control }) => {
  const classes = useStyles();
  const { setValue, setError, errors, clearErrors } = useForm({
    mode: 'onChange',
  });

  const { state, actions } = useStateMachine({ updateAction });
  const [date, setDate] = useState('');

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

  const handleChange = event => {
    if (state.BagelPickupLocation) {
      let dates = blackOutDates.filter(
        bod => state.BagelPickupLocation === bod.location
      )[0].dates;

      let isDateBad = dates.filter(
        date => date.getTime() === new Date(event.target.value).getTime()
      );

      if (isDateBad.length > 0) {
        setError('BagelPickupDate', {
          type: 'manual',
          message: 'Date not available',
        });
      } else {
        clearErrors();
        setDate(event.target.value);
      }
    } else {
      clearErrors();
      setDate(event.target.value);
    }
  };

  useEffect(() => {
    state.BagelPickupDate && setValue('BagelPickupDate', state.BagelPickupDate);
    return () => {};
  }, []);

  return (
    <>
      <SelectList
        id='BagelPickupDate'
        label='Select Date'
        handleChange={handleChange}
        value={date}
        name='BagelPickupDate'
        className={classes.formControl}
        control={control}
        defaultValue={date || ''}
        variant='outlined'
        margin='normal'
      >
        {dates &&
          dates.map(date => (
            <MenuItem key={date.value} value={date.value}>
              {date.label}
            </MenuItem>
          ))}
      </SelectList>

      {errors.BagelPickupDate && (
        <p className='text-m-red'>{errors.BagelPickupDate.message}</p>
      )}
    </>
  );
};

export default BagelPickupDates;

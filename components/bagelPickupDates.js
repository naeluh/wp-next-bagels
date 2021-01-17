import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';

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

const bagelPickupDates = ({ dates, locations }) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    errors,
    clearErrors,
  } = useForm({ mode: 'onChange' });
  const { state, action } = useStateMachine(updateAction);
  const [date, setDate] = useState('');

  const convertDateArray = string => {
    let array = string.replace(/\n/g, ' ').split(' ');
    array = array.map(item => new Date(item));
    return array;
  };

  let blackOutDates = locations.map(location => {
    return {
      dates: convertDateArray(location.locationData.blackoutDates),
      location: location.value,
    };
  });

  const onSubmit = data => {
    action(data);
  };

  const handleChange = event => {
    if (state.data.BagelPickupLocation) {
      let dates = blackOutDates.filter(
        bod => state.data.BagelPickupLocation === bod.location
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
    state.data.BagelPickupDate &&
      setValue('BagelPickupDate', state.data.BagelPickupDate);
    return () => {};
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.BagelPickupDate && <p>{errors.BagelPickupDate.message}</p>}
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='demo-simple-select-outlined-label'>
          Select Date
        </InputLabel>
        <Controller
          render={({ onChange, onBlur, value }) => (
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={date}
              label='Select Date'
              onChange={handleChange}
            >
              {dates &&
                dates.map(date => (
                  <MenuItem key={date.value} value={date.value}>
                    {date.label}
                  </MenuItem>
                ))}
            </Select>
          )}
          name={`BagelPickupDate`}
          control={control}
          defaultValue={date}
        />
        <Button variant='outlined' type='submit'>
          Ok
        </Button>
      </FormControl>
    </form>
  );
};

export default bagelPickupDates;

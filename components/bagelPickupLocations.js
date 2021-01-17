import React, { useState, useEffect } from 'react';
import styles from './bagelPickupLocations.module.css';
import {
  FormControl,
  Button,
  Select,
  MenuItem,
  makeStyles,
  InputLabel,
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

const bagelPickupLocations = ({ locations }) => {
  const classes = useStyles();
  const { control, handleSubmit, setValue } = useForm();
  const { state, action } = useStateMachine(updateAction);

  const onSubmit = data => {
    state.data.BagelPickupDate = '';
    setValue('BagelPickupDate', '');
    action(data);
    console.log(data);
  };

  const [location, setLocation] = useState('');

  const handleChange = event => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    console.log(state);
    state.data.BagelPickupLocation &&
      setValue('BagelPickupLocation', state.data.BagelPickupLocation);
    return () => {};
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl variant='outlined' className={classes.formControl}>
        {' '}
        <InputLabel id='demo-simple-select-outlined-label'>
          Select Location
        </InputLabel>
        <Controller
          as={
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={location}
              onChange={handleChange}
              label='Select Location'
            >
              {locations &&
                locations.map(location => (
                  <MenuItem key={location.value} value={location.value}>
                    {location.label}
                  </MenuItem>
                ))}
            </Select>
          }
          name={`BagelPickupLocation`}
          control={control}
          defaultValue={location}
        />
        <Button variant='outlined' type='submit'>
          Ok
        </Button>
      </FormControl>
    </form>
  );
};

export default bagelPickupLocations;

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

const bagelPickupLocations = ({ locations, control }) => {
  const classes = useStyles();
  const { setValue } = useForm();
  const { state } = useStateMachine(updateAction);

  const [location, setLocation] = useState('');

  const handleChange = event => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    state.BagelPickupLocation &&
      setValue('BagelPickupLocation', state.BagelPickupLocation);
    return () => {};
  }, []);

  return (
    <FormControl variant='outlined' className={classes.formControl}>
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
    </FormControl>
  );
};

export default bagelPickupLocations;

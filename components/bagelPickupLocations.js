import React, { useState } from 'react';
import styles from './bagelPickupLocations.module.css';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import BagelPickupLocation from './bagelPickupLocation';
import { Controller, useForm } from 'react-hook-form';

const bagelPickupLocations = ({ locations }) => {
  const { control } = useForm();
  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Select Location</FormLabel>
      <Controller
        as={
          <RadioGroup aria-label='locations'>
            {locations &&
              locations.map(location => (
                <BagelPickupLocation location={location} key={location.value} />
              ))}
          </RadioGroup>
        }
        name={`bagelPickupLocations`}
        control={control}
        defaultValue={''}
      />
    </FormControl>
  );
};

export default bagelPickupLocations;

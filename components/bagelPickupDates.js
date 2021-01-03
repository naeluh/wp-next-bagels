import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import BagelPickupDate from './bagelPickupDate';
import { Controller, useForm } from 'react-hook-form';

const bagelPickupDates = ({ dates }) => {
  const { control } = useForm();
  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Select Date</FormLabel>

      <Controller
        as={
          <RadioGroup aria-label='dates'>
            {dates.map(date => (
              <BagelPickupDate date={date} key={date.value} />
            ))}
          </RadioGroup>
        }
        name={`BagelPickupDates`}
        control={control}
        defaultValue={''}
      />
    </FormControl>
  );
};

export default bagelPickupDates;

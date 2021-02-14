import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const BagelPickupDate = ({ date }) => {
  return (
    <FormControlLabel
      value={date.value}
      control={<Radio inputProps={{ 'aria-label': date.label }} />}
      label={date.label}
    />
  );
};

export default BagelPickupDate;

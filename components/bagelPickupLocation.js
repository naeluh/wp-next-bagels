import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const bagelPickupLocation = ({ location }) => {
  return (
    <FormControlLabel
      value={location.value}
      control={<Radio inputProps={{ 'aria-label': location.label }} />}
      label={location.label}
    />
  );
};

export default bagelPickupLocation;

import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const LocationFormat = ({ location }) => {
  return (
    <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <p>{location.label}</p>
      <p>{location.locationData.locationAddress}</p>
    </div>
  );
};

const bagelPickupLocation = ({ location }) => {
  return (
    <FormControlLabel
      value={location.value}
      control={<Radio inputProps={{ 'aria-label': location.label }} />}
      label={<LocationFormat location={location} />}
    />
  );
};

export default bagelPickupLocation;

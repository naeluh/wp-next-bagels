import React from 'react';
import { FormControl, InputLabel, Select, withStyles } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const StyledFormControl = withStyles({
  root: {
    borderRadius: 0,
    margin: '8px 0',
    backgroundColor: 'white',
  },
})(FormControl);

const StyledInputLabel = withStyles({
  root: {
    borderRadius: 0,
    '&:hover': {
      borderRadius: 0,
    },
    '&:focus': {
      borderRadius: 0,
    },
  },
})(InputLabel);

const StyledSelect = withStyles({
  root: {
    borderRadius: 0,
    '&:hover': {
      borderRadius: 0,
    },
    '&:focus': {
      borderRadius: 0,
    },
    backgroundColor: 'white',
  },
})(Select);

const SelectList = ({
  name,
  label,
  control,
  defaultValue,
  children,
  handleChange,
  errors,
  rules,
  ...props
}) => {
  // We can inject some CSS into the DOM.
  const labelId = `${name}-label`;

  return (
    <StyledFormControl {...props}>
      <StyledInputLabel id={labelId}>{label}</StyledInputLabel>
      <Controller
        render={({ onChange, value, name }) => (
          <StyledSelect
            labelId={labelId}
            label={label}
            onChange={e => {
              onChange(e);
              handleChange(e);
            }}
            value={value ? value : ''}
            name={name}
          >
            {children}
          </StyledSelect>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
      />
    </StyledFormControl>
  );
};

export default SelectList;

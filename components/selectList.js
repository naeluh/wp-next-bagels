import React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const SelectList = ({
  name,
  label,
  control,
  defaultValue,
  children,
  handleChange,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        render={({ onChange, value, name }) => (
          <Select
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
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};

export default SelectList;

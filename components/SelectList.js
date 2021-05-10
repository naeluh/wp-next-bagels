import React, { useMemo, forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import Rselect from 'react-select';

const SelectList = forwardRef(
  (
    {
      name,
      label,
      control,
      children,
      handleChange,
      errors,
      rules,
      options,
      value,
      placeholder,
      ...props
    },
    ref
  ) => {
    // Styles for select list
    const customStyles = useMemo(
      () => ({
        option: (styles, { isSelected, isFocused, isDisabled }) => {
          let backgroundColor = '#FFFFFF';
          let color = '#000000';
          let borderColor = '#C6C6C6';

          if (isSelected) {
            backgroundColor = '#FFFFFF';
            color = '#000000';
            borderColor = '#000000';
          }

          if (isFocused) {
            backgroundColor = '#FFFFFF';
            color = '#000000';
          }

          if (isDisabled) {
            backgroundColor = '#FFFFFF';
            color = '#C6C6C6';
          }
          return {
            ...styles,
            borderRadius: 0,
            width: '100%',
            border: '1px solid #C6C6C6',
            borderColor,
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: '14px',
            backgroundColor,
            color,
            marginTop: 'px',
            '&:active': {
              // Overwrittes the different states of border
              background: '#fff',
            },
          };
        },
        control: styles => {
          return {
            ...styles,
            borderRadius: 0,
            border: '4px solid #fad113',
            minHeight: 52,
            boxShadow: 'none',
          };
        },
        menu: styles => {
          return {
            ...styles,
            borderRadius: 0,
            paddingTop: 0,
            marginTop: '-1px',
            minHeight: 52,
            boxShadow: 'none',
          };
        },
        menuList: styles => {
          return {
            ...styles,
            borderRadius: 0,
            paddingTop: 0,
            paddingBottom: 0,
            minHeight: 52,
          };
        },
        singleValue: (styles, state) => {
          return { ...styles, borderRadius: 0 };
        },
        indicatorSeparator: (styles, state) => {
          return {
            ...styles,
            borderRadius: 0,
          };
        },
        indicatorContainer: (styles, state) => {
          return {
            ...styles,
            borderRadius: 0,
          };
        },
      }),
      []
    );

    return (
      <div {...props}>
        <Controller
          render={({ onChange, value, name, getOptionValue }) => (
            <Rselect
              ref={ref}
              isSearchable={false}
              styles={customStyles}
              autoFocus={false}
              onChange={handleChange}
              defaultValue={value}
              value={value}
              name={name}
              options={options}
              placeholder={placeholder}
              className='font-serif font-bold'
            />
          )}
          name={name}
          control={control}
          defaultValue={value}
          rules={rules}
        />
      </div>
    );
  }
);

export default SelectList;

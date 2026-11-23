'use client';

import React, { useMemo } from 'react';
import {
  Controller,
  type Control,
  type ControllerProps,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form';
import Rselect, {
  type CSSObjectWithLabel,
  type OptionProps,
  type PropsValue,
  type SelectInstance,
  type SingleValue,
} from 'react-select';
import type { Option } from '../lib/types';

type Props<T extends FieldValues> = {
  id?: string;
  name: Path<T>;
  label?: string;
  control: Control<T>;
  handleChange: (option: SingleValue<Option>) => void;
  rules?: ControllerProps<T, Path<T>>['rules'];
  options?: Option[];
  value?: PathValue<T, Path<T>>;
  placeholder?: string;
  noOptionsMessage?: () => string;
  ref?: React.Ref<SelectInstance<Option, false>>;
};

const SelectList = <T extends FieldValues>({
  name,
  label,
  control,
  handleChange,
  rules,
  options,
  value,
  placeholder,
  noOptionsMessage,
  ref,
  ...props
}: Props<T>) => {
  // Styles for select list
  const customStyles = useMemo(
    () => ({
      option: (
        styles: CSSObjectWithLabel,
        { isSelected, isFocused, isDisabled }: OptionProps<Option, false>
      ) => {
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
      control: (styles: CSSObjectWithLabel) => {
        return {
          ...styles,
          borderRadius: 0,
          border: '8px solid #fad113',
          minHeight: 52,
          boxShadow: 'none',
        };
      },
      menu: (styles: CSSObjectWithLabel) => {
        return {
          ...styles,
          borderRadius: 0,
          paddingTop: 0,
          marginTop: '-1px',
          minHeight: 52,
          boxShadow: 'none',
        };
      },
      menuList: (styles: CSSObjectWithLabel) => {
        return {
          ...styles,
          borderRadius: 0,
          paddingTop: 0,
          paddingBottom: 0,
          minHeight: 52,
        };
      },
      singleValue: (styles: CSSObjectWithLabel, state: unknown) => {
        return { ...styles, borderRadius: 0 };
      },
      indicatorSeparator: (styles: CSSObjectWithLabel, state: unknown) => {
        return {
          ...styles,
          borderRadius: 0,
          color: 'transparent',
          backgroundColor: 'transparent',
        };
      },
      valueContainer: (styles: CSSObjectWithLabel, state: unknown) => {
        return {
          ...styles,
          border: 'none',
        };
      },
      indicatorContainer: (styles: CSSObjectWithLabel, state: unknown) => {
        return {
          ...styles,
          borderRadius: 0,
          border: 'none',
        };
      },
      noOptionsMessage: (styles: CSSObjectWithLabel, state: unknown) => {
        return {
          ...styles,
          borderRadius: 0,
          minHeight: 52,
          border: '1px solid #C6C6C6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        };
      },
    }),
    []
  );

  return (
    <div {...props}>
      <Controller
        render={({ field }) => (
          <Rselect
            ref={ref}
            isSearchable={false}
            styles={customStyles}
            autoFocus={false}
            onChange={handleChange}
            defaultValue={field.value as PropsValue<Option>}
            value={field.value as PropsValue<Option>}
            name={field.name}
            options={options}
            placeholder={placeholder}
            className='font-serif font-bold'
            noOptionsMessage={noOptionsMessage}
          />
        )}
        name={name}
        control={control}
        defaultValue={value}
        rules={rules}
      />
    </div>
  );
};

export default SelectList;

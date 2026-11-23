'use client';

import React from 'react';
import styles from './radiobutton.module.css';
import type { Option } from '../lib/types';

type Props = {
  name: string;
  label: string;
  handleChange: (option: Option) => void;
  value: string;
  index: number;
  radioVal: Partial<Option>;
};

const RadioButton = ({
  name,
  label,
  handleChange,
  value,
  index,
  radioVal,
}: Props) => {
  return (
    <div
      className={[
        styles.listItem,
        radioVal.value === value ? styles.active : '',
      ].join(' ')}
    >
      <label
        className={radioVal.value === value ? styles.active : ''}
        htmlFor={`rb-${name}-${index}`}
      >
        <span>{label}</span>
        <input
          aria-required='true'
          id={`rb-${name}-${index}`}
          type='radio'
          name={name}
          value={value}
          checked={radioVal.value === value ? true : false}
          onChange={event =>
            handleChange({ label: label, value: event.target.value })
          }
        />
      </label>
    </div>
  );
};
export default RadioButton;

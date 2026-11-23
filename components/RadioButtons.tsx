'use client';

import React, { useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import styles from './radiobutton.module.css';
import RadioButton from './RadioButton';
import type { Option } from '../lib/types';

// '' = nothing chosen yet; AddDateLocation also resets the date to [].
type Selection = Option | '' | never[];

type Props = {
  id?: string;
  label?: string;
  type?: string;
  title: string;
  group: Option[];
  name: string;
  handleChange: (option: Option) => void;
  errors: FieldErrors<FieldValues>;
  radioVal: Selection;
  register: UseFormRegister<FieldValues>;
  state: Selection;
  currentValue?: Option | '';
  setCurrentValue?: Dispatch<SetStateAction<Option | ''>>;
};

const RadioButtons = ({
  title,
  group,
  name,
  handleChange,
  errors,
  radioVal,
  register,
  state,
}: Props) => {
  // Custom registration: value is a { label, value } object set via setValue.
  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  return (
    <fieldset
      className={[
        'radiogroup-fieldset',
        (radioVal as Partial<Option>).value === (state as Partial<Option>).value
          ? styles.active
          : '',
      ].join(' ')}
    >
      <legend
        className={[
          errors[name]?.type === 'required' ? styles.active : '',
          styles.radioButtonHeading,
        ].join(' ')}
        id={`group_label_${name}`}
        data-content={`required`}
      >
        {title}
        <span className={styles.requiredBadge}>Required</span>
      </legend>

      <div
        className={[
          'radiogroup',
          styles.radioButtons,
          (radioVal as Partial<Option>).value ===
          (state as Partial<Option>).value
            ? styles.active
            : '',
        ].join(' ')}
        aria-labelledby={`group_label_${name}`}
      >
        {group.map((g, index) => {
          return (
            <RadioButton
              value={g.value}
              label={g.label}
              key={index}
              index={index}
              name={name}
              handleChange={handleChange}
              radioVal={radioVal as Partial<Option>}
            />
          );
        })}
      </div>
    </fieldset>
  );
};

export default RadioButtons;

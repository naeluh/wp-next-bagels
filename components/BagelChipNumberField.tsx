'use client';

import React, { useState, useEffect } from 'react';
import type { GlobalState } from 'little-state-machine';
import type {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import styles from './bagelNumberField.module.css';
import type { BagelChip, Edge } from '../lib/types';

type Props = {
  register: UseFormRegister<FieldValues>;
  defaultValues: { bagelChipVal: number };
  bagelChip: Edge<BagelChip>;
  setValue: UseFormSetValue<FieldValues>;
  state: GlobalState;
};

const BagelChipNumberField = ({
  register,
  defaultValues,
  bagelChip,
  setValue,
  state,
}: Props) => {
  const [currentValue, setCurrentValue] = useState(defaultValues.bagelChipVal);

  useEffect(() => {
    if (Object.values(state.data.bagelChips).length > 0) {
      const valsArr = Object.values(state.data.bagelChips);
      const keysArr = Object.keys(state.data.bagelChips);
      keysArr.map((chip, idx) => {
        if (bagelChip.node.title === chip) {
          setCurrentValue(valsArr[idx]);
        }
      });
    }
  }, []);

  const fieldName = bagelChip.node.title.toString();

  useEffect(() => setValue(fieldName, currentValue), [currentValue]);

  return (
    <div className={styles.outerNumberContainer}>
      <label className='text-xl md:text-2xl tracking-tighter leading-tight md:leading-8 md:pr-8 font-serif text-black px-5 flex items-center justify-center'>
        {bagelChip.node.title}
      </label>

      <div className={styles.numberContainer}>
        <button
          type='button'
          onClick={() =>
            (bagelChip.node.bagelChipsDetails.quantity as number) >
              currentValue && setCurrentValue(currentValue + 1)
          }
          className={`${styles.add} add`}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>
            <path
              d='M20,0V40m20-20H0'
              fill='none'
              stroke='#fff'
              strokeMiterlimit='10'
              strokeWidth='12'
            />
          </svg>
        </button>

        <input
          {...register(fieldName, { min: 0 })}
          className={`quantity font-serif`}
          min='0'
          max='12'
          type='number'
          step='10'
          value={currentValue}
          readOnly
        />

        <button
          type='button'
          onClick={() => currentValue > 0 && setCurrentValue(currentValue - 1)}
          className={`${styles.remove} remove`}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>
            <line
              x1='40'
              y1='20'
              y2='20'
              fill='none'
              stroke='#fff'
              strokeMiterlimit='10'
              strokeWidth='12'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BagelChipNumberField;

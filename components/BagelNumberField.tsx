'use client';

import React, { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import styles from './bagelNumberField.module.css';
import type { BagelSet } from '../lib/store';
import type { Bagel, Edge } from '../lib/types';

type Props = {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  bagel: Edge<Bagel>;
  setTotalBagels: Dispatch<SetStateAction<number>>;
  totalBagels: number;
  amount: number;
  bagelSet: BagelSet | undefined;
  defaultValues?: Record<string, number>;
};

const BagelNumberField = ({
  register,
  setValue,
  getValues,
  bagel,
  setTotalBagels,
  totalBagels,
  amount,
  bagelSet,
}: Props) => {
  const [currentValue, setCurrentValue] = useState(
    bagelSet
      ? bagelSet.bagels.filter(b => b.key === bagel.node.title)[0].value
      : 0
  );

  useEffect(() => {
    setValue(bagel.node.title, currentValue);
    const sum = Object.values(getValues()).reduce(
      (a, b) => a + (Number(b) || 0),
      0
    );
    setTotalBagels(sum);
  }, [currentValue]);

  useEffect(
    () => setCurrentValue(totalBagels !== 0 ? currentValue : totalBagels),
    [totalBagels]
  );

  return (
    <div className={styles.outerNumberContainer}>
      <label className='text-xl md:text-2xl tracking-tighter leading-tight md:leading-8 md:pr-8 font-serif font-black text-black px-5 flex items-center justify-center'>
        {bagel.node.title}
      </label>

      <div className={styles.numberContainer}>
        <button
          type='button'
          onClick={() => {
            totalBagels !== amount &&
              currentValue <= 12 &&
              setCurrentValue(currentValue + 3);
          }}
          className={`${styles.add} add ${totalBagels >= amount && styles.limit}`}
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
          {...register(bagel.node.title, { min: 0, max: amount })}
          className='quantity font-serif font-black'
          min='0'
          max='12'
          type='number'
          step='1'
          value={currentValue}
          readOnly
        />

        <button
          type='button'
          onClick={() => {
            currentValue <= 12 &&
              currentValue >= 1 &&
              setCurrentValue(currentValue - 3);
          }}
          className={`${styles.remove} remove ${totalBagels >= amount && styles.limit}`}
        >
          <svg id='a' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>
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

export default BagelNumberField;

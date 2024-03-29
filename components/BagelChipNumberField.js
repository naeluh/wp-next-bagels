import React, { useState, useEffect } from 'react';
import {
  outerNumberContainer,
  numberContainer,
  add,
  remove,
} from './bagelNumberField.module.css';

const BagelChipNumberField = ({
  register,
  defaultValues,
  bagelChip,
  setValue,
  state,
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValues.bagelChipVal);

  useEffect(() => {
    if (Object.values(state.data.bagelChips).length > 0) {
      const valsArr = Object.values(state.data.bagelChips);
      const keysArr = Object.keys(state.data.bagelChips);
      keysArr.map((chip, idx) => {
        if (bagelChip.node.title === chip) {
          setCurrentValue(valsArr[idx]);
          setValue(chip, valsArr[idx]);
        }
      });
    }
  }, []);

  const fieldName = bagelChip.node.title.toString();

  return (
    <div className={outerNumberContainer}>
      <label className='text-xl md:text-2xl tracking-tighter leading-tight md:pr-8 font-serif text-black px-5 flex items-center justify-center'>
        {bagelChip.node.title}
      </label>

      <div className={numberContainer}>
        <button
          type='button'
          variant='contained'
          onClick={() =>
            bagelChip.node.bagelChipsDetails.quantity > currentValue &&
            setCurrentValue(currentValue + 1)
          }
          className={`${add} add`}
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
          ref={register({
            min: 0,
            valueAsNumber: true,
            valueAsDate: true,
          })}
          className={`quantity font-serif`}
          min='0'
          max='12'
          type='number'
          step='10'
          name={fieldName}
          value={currentValue}
          readOnly
        />

        <button
          type='button'
          variant='contained'
          onClick={() => currentValue > 0 && setCurrentValue(currentValue - 1)}
          className={`${remove} remove`}
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

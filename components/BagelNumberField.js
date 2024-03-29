import React, { useState, useEffect } from 'react';
import {
  outerNumberContainer,
  numberContainer,
  add,
  remove,
  limit,
} from './bagelNumberField.module.css';

const BagelNumberField = ({
  control,
  bagel,
  setTotalBagels,
  totalBagels,
  amount,
  bagelSet,
}) => {
  const [currentValue, setCurrentValue] = useState(
    bagelSet
      ? bagelSet.bagels.filter(b => b.key === bagel.node.title)[0].value
      : control.defaultValuesRef.current.bagelVal
  );

  useEffect(() => {
    const vals = control.getValues();
    const valArr = Object.keys(vals).map(key => vals[key]);
    const sum = valArr.reduce((a, b) => a + b, 0);
    setTotalBagels(sum);
  }, [currentValue]);

  useEffect(
    () => setCurrentValue(totalBagels !== 0 ? currentValue : totalBagels),
    [totalBagels]
  );

  return (
    <div className={outerNumberContainer}>
      <label className='text-xl md:text-2xl tracking-tighter leading-tight md:pr-8 font-serif font-black text-black px-5 flex items-center justify-center'>
        {bagel.node.title}
      </label>

      <div className={numberContainer}>
        <button
          type='button'
          variant='contained'
          onClick={() => {
            totalBagels !== amount &&
              currentValue <= 12 &&
              setCurrentValue(currentValue + 3);
          }}
          className={`${add} add ${totalBagels >= amount && limit}`}
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
          ref={control.register({
            min: 0,
            max: amount,
            valueAsNumber: true,
            valueAsDate: true,
          })}
          className='quantity font-serif font-black'
          min='0'
          max='12'
          type='number'
          step='1'
          name={bagel.node.title}
          value={currentValue}
          readOnly
        />

        <button
          type='button'
          variant='contained'
          onClick={() => {
            currentValue <= 12 &&
              currentValue >= 1 &&
              setCurrentValue(currentValue - 3);
          }}
          className={`${remove} remove ${totalBagels >= amount && limit}`}
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

import React, { useState, useEffect } from 'react';
import styles from './bagelNumberField.module.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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

  return (
    <div className={styles.outerNumberContainer}>
      <label className='text-xl md:text-2xl tracking-tighter leading-tight md:pr-8 font-serif text-black px-5 flex items-center justify-center'>
        {bagel.node.title}
      </label>

      <div className={styles.numberContainer}>
        <button
          type='button'
          variant='contained'
          onClick={() => {
            totalBagels !== amount &&
              currentValue <= 12 &&
              setCurrentValue(currentValue + 1);
          }}
          className={`${styles.add} add ${totalBagels >= amount && ` limit`}`}
        >
          <AddIcon />
        </button>

        <input
          ref={control.register({
            min: 0,
            max: amount,
            valueAsNumber: true,
            valueAsDate: true,
          })}
          className='quantity'
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
              setCurrentValue(currentValue - 1);
          }}
          className={`${styles.remove} remove`}
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
};

export default BagelNumberField;

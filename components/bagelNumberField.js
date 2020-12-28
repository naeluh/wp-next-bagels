import React, { useRef, useState, useEffect } from 'react';
import styles from './bagelNumberField.module.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Controller, useForm } from 'react-hook-form';

function bagelNumberField({
  bagel,
  control,
  register,
  defaultValues,
  getValues,
  setValue,
}) {
  const [currentValue, setCurrentValue] = useState(defaultValues.bagelVal);

  const handleUpdate = e => {
    if (e.target.classList.contains('add')) {
      if (currentValue <= 11) {
        setCurrentValue(currentValue + 1);
      }
    } else {
      if (currentValue >= 1) {
        setCurrentValue(currentValue - 1);
      }
    }
  };

  useEffect(() => {
    setValue(bagel.node.bagelInfo.bagelTitle, currentValue);
    return () => {};
  }, []);

  return (
    <div className={styles.outerNumberContainer}>
      <label className='text-xl md:text-xl font-hairline tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-black px-5'>
        {bagel.node.bagelInfo.bagelTitle}
      </label>
      <div className={styles.numberContainer}>
        <button
          type='button'
          onClick={handleUpdate}
          className={`${styles.add} add`}
        >
          <AddIcon />
        </button>

        <input
          control={control}
          ref={register({ min: 0, max: 12 })}
          className='quantity'
          type='number'
          max='12'
          min='0'
          step='1'
          value={currentValue}
          name={bagel.node.bagelInfo.bagelTitle}
          disabled
        />

        <button
          type='button'
          onClick={handleUpdate}
          className={`${styles.remove} remove`}
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
}

export default bagelNumberField;

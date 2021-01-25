import React, { useState, useEffect } from 'react';
import styles from './bagelNumberField.module.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const bagelChipNumberField = ({
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
          console.log(chip, idx, valsArr[idx]);
          setValue(chip, valsArr[idx]);
        }
      });
    }
  }, []);

  const fieldName = bagelChip.node.title.toString();

  return (
    <div className={styles.outerNumberContainer}>
      <label className='text-xl md:text-xl font-hairline tracking-tighter leading-tight md:pr-8 font-serif text-black px-5 flex items-center justify-center'>
        {bagelChip.node.title}
      </label>

      <div className={styles.numberContainer}>
        <button
          type='button'
          variant='contained'
          onClick={() =>
            bagelChip.node.bagelChipsDetails.quantity > currentValue &&
            setCurrentValue(currentValue + 1)
          }
          className={`${styles.add} add`}
        >
          <AddIcon />
        </button>

        <input
          ref={register({
            min: 0,
            valueAsNumber: true,
            valueAsDate: true,
          })}
          className={`quantity`}
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
          className={`${styles.remove} remove`}
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
};

export default bagelChipNumberField;

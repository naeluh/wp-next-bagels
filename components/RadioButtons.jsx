import React, { useRef } from 'react';
import styles from './radiobutton.module.css';
import RadioButton from './RadioButton';

const RadioButtons = ({
  title,
  group,
  name,
  label,
  control,
  children,
  handleChange,
  errors,
  rules,
  radioVal,
  noOptionsMessage,
  defaultValues,
  register,
  type,
  state,
  currentValue,
  setCurrentValue,
}) => {
  const rbRef = useRef(null);
  console.log(errors[name], type);
  return (
    <>
      <h3
        className={[
          errors[name]?.type === 'required' ? styles.active : '',
          styles.radioButtonHeading,
        ].join(' ')}
        id={`group_label_${name}`}
        data-content={`required`}
      >
        {title}
      </h3>

      <ul
        className={[
          'radiogroup-activedescendant',
          styles.radioButtons,
          radioVal.value === state.value ? styles.active : '',
        ].join(' ')}
        role='radiogroup'
        aria-labelledby={`group_label_${name}`}
        aria-activedescendant='rb11'
        tabIndex='0'
        ref={rbRef}
      >
        {group.map((g, index) => {
          return (
            <RadioButton
              value={g.value}
              label={g.label}
              control={control}
              key={index}
              index={index}
              name={name}
              state={state}
              register={register}
              handleChange={handleChange}
              defaultValues={defaultValues}
              type={type}
              currentValue={currentValue}
              setCurrentValue={setCurrentValue}
              radioVal={radioVal}
              rules={rules}
            />
          );
        })}
      </ul>
    </>
  );
};

export default RadioButtons;

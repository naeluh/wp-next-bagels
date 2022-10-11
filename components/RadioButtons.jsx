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
  return (
    <fieldset
      className={[
        'radiogroup-fieldset',
        radioVal.value === state.value ? styles.active : '',
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
          radioVal.value === state.value ? styles.active : '',
        ].join(' ')}
        aria-labelledby={`group_label_${name}`}
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
      </div>
    </fieldset>
  );
};

export default RadioButtons;

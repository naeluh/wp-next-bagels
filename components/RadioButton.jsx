import React from 'react';
import styles from './radiobutton.module.css';

const RadioButton = ({
  name,
  label,
  handleChange,
  value,
  index,
  register,
  radioVal,
}) => {
  const registration = register(name, { required: true });
  const { onChange: registerOnChange, ...registerRest } = registration;
  return (
    <div
      className={[
        styles.listItem,
        radioVal.value === value ? styles.active : '',
      ].join(' ')}
    >
      <label
        className={radioVal.value === value ? styles.active : ''}
        htmlFor={`rb-${name}-${index}`}
      >
        <span>{label}</span>
        <input
          aria-required='true'
          {...registerRest}
          id={`rb-${name}-${index}`}
          type='radio'
          value={value}
          checked={radioVal.value === value ? true : false}
          onChange={event => {
            registerOnChange(event);
            handleChange({ label: label, value: event.target.value });
          }}
        />
      </label>
    </div>
  );
};
export default RadioButton;

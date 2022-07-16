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
  return (
    <li>
      <label
        className={radioVal.value === value ? styles.active : ''}
        htmlFor={`rb-${name}-${index}`}
      >
        <span>{label}</span>
        <input
          required
          aria-required='true'
          ref={register(name, { required: true })}
          id={`rb-${name}-${index}`}
          type='radio'
          name={name}
          value={value}
          checked={radioVal.value === value ? true : false}
          onChange={event =>
            handleChange({ label: label, value: event.target.value })
          }
        />
      </label>
    </li>
  );
};
export default RadioButton;

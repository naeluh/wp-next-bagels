import React, { forwardRef } from 'react';

type Props = {
  placeholder?: any;
  type?: any;
  name?: any;
  onChange?: any;
  required?: any;
  value?: any;
};

const Input = forwardRef(
  ({
    placeholder = '',
    type = '',
    name = '',
    onChange = () => {},
    required = false,
    value = '',
  }: Props) => {
    return (
      <input
        value={value}
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={onChange}
        required={required}
        className='bg-white w-full border-8 border-m-black placeholder-m-black  text-m-black p-4 my-4 block focus:outline-none focus:ring-2 ring-m-yellow'
      />
    );
  }
);

export default Input;

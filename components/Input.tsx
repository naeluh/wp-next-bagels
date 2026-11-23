import React from 'react';

type Props = {
  placeholder?: string;
  type?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
};

const Input = ({
  placeholder = '',
  type = '',
  name = '',
  onChange = () => {},
  required = false,
}: Props) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={onChange}
      required={required}
      className='bg-white w-full border-8 border-m-black placeholder-m-black  text-m-black p-4 my-4 block focus:outline-hidden focus:ring-2 ring-m-yellow'
    />
  );
};

export default Input;

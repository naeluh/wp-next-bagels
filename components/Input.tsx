import React from 'react';

type Props = {
  placeholder: any;
  type: any;
  name: any;
  onChange: any;
  required: any;
};

const Input = ({ placeholder, type, name, onChange, required }: Props) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={onChange}
      required={required}
      className='w-full elements-style border border-gray-300 p-4 my-4 block focus:outline-none focus:ring-2 ring-blue-200'
    />
  );
};

export default Input;

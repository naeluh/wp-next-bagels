import React from 'react';

type Props = {
  placeholder: any;
  name: any;
  required: any;
};

const TextArea = ({ placeholder, name, onChange, required }: Props) => {
  return (
    <textarea
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      required={required}
      className='w-full elements-style border border-gray-300 p-4 my-4 block focus:outline-none focus:ring-2 ring-blue-200'
    ></textarea>
  );
};

export default TextArea;

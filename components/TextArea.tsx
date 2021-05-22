import React from 'react';

type Props = {
  placeholder: any;
  name: any;
  required: any;
  onChange: any;
};

const TextArea = ({ placeholder, name, onChange, required }: Props) => {
  return (
    <textarea
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      required={required}
      className='bg-white w-full border-8 border-m-black p-4 my-4 block focus:outline-none focus:ring-2 focus ring-m-yellow h-48'
    ></textarea>
  );
};

export default TextArea;

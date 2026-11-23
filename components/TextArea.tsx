import React from 'react';

type Props = {
  placeholder: string;
  name: string;
  required: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const TextArea = ({ placeholder, name, onChange, required }: Props) => {
  return (
    <textarea
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      required={required}
      className='bg-white w-full border-8 border-m-black p-4 my-4 block focus:outline-hidden focus:ring-2 focus ring-m-yellow h-48'
    ></textarea>
  );
};

export default TextArea;

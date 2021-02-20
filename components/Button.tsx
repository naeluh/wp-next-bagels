import React from 'react';

type Props = {
  type: any;
  text: any;
  disabled: any;
  style: any;
  onClick: any;
};

const Button = ({ type, text, disabled, style, onClick }: Props) => {
  return (
    <button
      className='bg-m-yellow text-white active:bg-yellow-400 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
      type={type}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

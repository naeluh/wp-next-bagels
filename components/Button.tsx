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
      className='pr-4 pl-4 pt-2 pb-2 my-4 md:block font-serif font-bold leading-tight text-lg text-m-black border-4 border-m-yellow bg-white hover:border-m-black hover:text-m-yellow active:border-m-yellow hover:bg-m-black focus:outline-none disabled:opacity-25'
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

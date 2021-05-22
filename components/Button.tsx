import React from 'react';

type Props = {
  type: any;
  text: any;
  disabled: any;
  style: any;
  onClick: any;
  fullWidth: boolean;
};

const Button = ({
  type,
  text,
  disabled,
  style,
  onClick,
  fullWidth = false,
}: Props) => {
  return (
    <button
      className={`font-serif font-black leading-tight text-lg text-m-black border-m-yellow bg-white hover:border-m-black hover:text-m-yellow active:border-m-yellow hover:bg-m-black focus:outline-none disabled:opacity-25 border-8 px-4 py-2 my-4 block ${
        fullWidth ? `w-full` : ``
      }`}
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

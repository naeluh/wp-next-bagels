import React from 'react';
import Link from 'next/link';
import styles from './button.module.css';

type Props = {
  type?: any;
  text?: any;
  disabled?: any;
  style?: any;
  onClick?: any;
  fullWidth?: boolean;
  link?: boolean;
  url?: string;
};

const Button = ({
  type,
  text,
  disabled,
  style,
  onClick,
  fullWidth = false,
  link = false,
  url,
}: Props) => {
  return !link ? (
    <button
      className={`${styles.mainButton}  ${fullWidth ? `w-full` : ``}`}
      type={type}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  ) : !disabled ? (
    (<Link
      href={`/${url}`}
      className={`${styles.mainButton}  ${fullWidth ? `w-full` : ``}`}
      style={style}
      onClick={onClick}>

      {text}

    </Link>)
  ) : (
    <button
      disabled={disabled}
      className={`${styles.mainButton}  ${fullWidth ? `w-full` : ``}`}
    >
      {text}
    </button>
  );
};

export default Button;

import React from 'react';
import styles from './bagel.module.css';

const bagel = ({ title, desc, price }) => {
  console.log(title, desc, price);
  return (
    <div>
      <h4 className='text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
        {title}
      </h4>{' '}
      <p>{desc}</p> <p>{price}</p>
    </div>
  );
};

export default bagel;

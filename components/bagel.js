import React from 'react';
import styles from './bagel.module.css';

const bagel = ({ title, desc, price }) => {
  return (
    <div>
      <div className='w-full overflow-hidden mb-6'>
        <img
          className='object-cover h-48 w-full'
          src='/static/images/bagel.jpg'
        />
      </div>
      <h4 className='text-xl font-normal tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
        {title}
      </h4>{' '}
      <p className={styles.p}>{desc}</p>
    </div>
  );
};

export default bagel;

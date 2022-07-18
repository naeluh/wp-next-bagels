import React from 'react';
import FadeInDirection from './FadeInDirection';
import VsensorAnimate from './VsensorAnimate';
import Image from 'next/image';
import styles from './bagel.module.css';

const Bagel = ({ title, img, desc }) => {
  const imageSrc = `/static/images/bagels.jpg`;
  return (
    <div className={styles.bagelContainer}>
      <h5
        className={[
          'text-3xl font-semibold tracking-tighter leading-tight font-serif',
          styles.bagelHeader,
        ].join(' ')}
      >
        {' '}
        <span className={styles.bagelIcon}></span>
        <span className={styles.bagelText}>{title}</span>
      </h5>
      {desc && (
        <p className='text-base font-normal tracking-tighter leading-tight font-sans'>
          {desc}
        </p>
      )}
    </div>
  );
};

export default Bagel;

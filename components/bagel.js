import React from 'react';
import styles from './bagel.module.css';

const bagel = ({ title, desc, img, price }) => {
  return (
    <div>
      <div className='w-full overflow-hidden mb-6 border-black border-12'>
        {img ? (
          <img
            className='object-cover h-48 w-full object-top'
            src={img.sourceUrl}
          />
        ) : (
          <img
            className='object-cover h-48 w-full object-top'
            src='/static/images/bagel.jpg'
          />
        )}
      </div>
      <h4 className='text-xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
        {title}
      </h4>{' '}
      {desc && <p className={styles.p}>{desc}</p>}
    </div>
  );
};

export default bagel;

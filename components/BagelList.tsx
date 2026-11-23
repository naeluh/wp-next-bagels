import React from 'react';
import styles from './bagelList.module.css';

type Props = {
  title: string;
  desc: string;
  priceTitle: string;
  priceDesc: string;
};

const BagelList = ({ title, desc, priceTitle, priceDesc }: Props) => {
  return (
    <section
      className={`text-center z-0 py-4 bg-cover bg-center flex-col flex md:flex-row md:justify-between mb-4 md:mb-6 md:px-12 md:py-6 lg:items-center`}
    >
      <div className='flex-1'>
        <h3 className='text-4xl md:text-6xl font-bold tracking-tighter leading-tight font-serif mb-4 text-black'>
          {title}
        </h3>
        <span className={styles.borderBottom}></span>
        <h4 className='text-2xl font-regular tracking-tighter leading-tight mb-4 text-black font-serif'>
          {desc}
        </h4>
        <span className={styles.borderBottom}></span>
        <h4 className='text-2xl font-medium tracking-tighter leading-tight font-serif mb-4 text-black'>
          {priceDesc}
        </h4>
      </div>
    </section>
  );
};

export default BagelList;

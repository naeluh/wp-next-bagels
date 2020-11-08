import React from 'react';

import styles from './locationsTimes.module.css';
import Location from './location';

const locationsTimes = ({ locations }) => {
  return (
    <>
      <section
        className={`text-center z-0 py-4 bg-cover bg-center flex-col flex md:flex-row md:justify-between mb-4 md:mb-6 md:px-12 md:py-6 lg:items-center`}
      >
        <div className='flex-1 z-10'>
          <h3 className='text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-black'>
            {'Come Visit Us'}
          </h3>
          <span className={styles.borderBottom}></span>
        </div>
      </section>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
        {locations.map(({ location, times }, index) => (
          <Location location={location} times={times} key={location + index} />
        ))}
      </section>
    </>
  );
};

export default locationsTimes;

import React from 'react';

import styles from './locationsTimes.module.css';
import Location from './location';

const locationsTimes = ({ locations }) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
      {locations.map(({ location, times }, index) => (
        <Location location={location} times={times} key={location + index} />
      ))}
    </section>
  );
};

export default locationsTimes;

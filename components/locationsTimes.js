import React from 'react';

import styles from './locationsTimes.module.css';
import Location from './location';

const locationsTimes = ({ locations }) => {
  return (
    <section>
      {locations.map(({ location, times }, index) => (
        <Location location={location} times={times} key={location + index} />
      ))}
    </section>
  );
};

export default locationsTimes;

import React from 'react';

import styles from './locations.module.css';
import Time from './time';

const location = ({ location, times }) => {
  return (
    <section>
      <h4 className='text-2xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
        {location}
      </h4>
      {times.map((item, index) => (
        <Time time={item} key={item + index} />
      ))}
    </section>
  );
};

export default location;

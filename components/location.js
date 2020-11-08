import React from 'react';

import styles from './locations.module.css';
import Time from './time';

const location = ({ location, times }) => {
  return (
    <div>
      <h4 className='text-xl font-normal tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
        {location}
      </h4>
      {times.map((item, index) => (
        <Time time={item} key={item + index} />
      ))}
    </div>
  );
};

export default location;

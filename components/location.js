import React from 'react';

import styles from './locations.module.css';
import Time from './time';

const location = ({ location, times }) => {
  return (
    <div>
      <div className='w-full overflow-hidden mb-6'>
        <img
          className='object-cover object-top h-48 w-full'
          src='/static/images/tent.jpg'
        />
      </div>
      <h4 className='text-xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
        {location}
      </h4>
      {times.map((item, index) => (
        <Time time={item} key={item + index} />
      ))}
    </div>
  );
};

export default location;

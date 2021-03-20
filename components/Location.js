import React from 'react';

import styles from './locations.module.css';
import Time from './Time';
import { Spring } from 'react-spring/renderprops.cjs';
import dynamic from 'next/dynamic';

const Location = ({ title, img, times }) => {
  const VsensorAnimate = dynamic(import('./VsensorAnimate'));
  return (
    <VsensorAnimate once>
      {({ isVisible }) => (
        <Spring
          delay={0.2}
          to={{
            transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
            opacity: isVisible ? '1' : '0',
          }}
        >
          {({ transform, opacity }) => (
            <div style={{ transform, opacity }}>
              <div className='w-full overflow-hidden mb-6'>
                <img
                  className='object-cover object-top h-48 w-full'
                  src={img ? img.node.sourceUrl : `/static/images/tent.jpg`}
                />
              </div>
              <h4 className='text-xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
                {title}
              </h4>
              {times.map((item, index) => (
                <Time time={item} key={item + index} />
              ))}
            </div>
          )}
        </Spring>
      )}
    </VsensorAnimate>
  );
};

export default Location;

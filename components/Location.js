import React from 'react';
import Time from './Time';
import FadeInDirection from './FadeInDirection';
import VsensorAnimate from './VsensorAnimate';

const Location = ({ title, img, times }) => {
  return (
    <VsensorAnimate once>
      {({ isVisible }) => (
        <FadeInDirection isVisible={isVisible}>
          <div>
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
        </FadeInDirection>
      )}
    </VsensorAnimate>
  );
};

export default Location;

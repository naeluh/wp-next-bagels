import React from 'react';
import FadeInDirection from './FadeInDirection';
import VsensorAnimate from './VsensorAnimate';

const Bagel = ({ title, img, desc }) => {
  const imageSrc = `/static/images/bagels.jpg`;
  return (
    <VsensorAnimate once>
      {({ isVisible }) => (
        <FadeInDirection isVisible={isVisible}>
          <div>
            <div className='w-full overflow-hidden mb-6 border-black border-8'>
              {img ? (
                <img
                  className='object-cover h-48 w-full object-center'
                  style={{ filter: 'saturate(1.2)' }}
                  src={img.node.sourceUrl}
                />
              ) : (
                <img
                  className='object-cover h-48 w-full object-center'
                  style={{ filter: 'saturate(1.2)' }}
                  src={imageSrc}
                />
              )}
            </div>
            <h4 className='text-xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
              {title}
            </h4>
            {desc && (
              <p className='text-base font-normal tracking-tighter leading-tight md:pr-8 font-sans mb-4'>
                {desc}
              </p>
            )}
          </div>
        </FadeInDirection>
      )}
    </VsensorAnimate>
  );
};

export default Bagel;

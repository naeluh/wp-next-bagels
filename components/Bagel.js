import React from 'react';
import FadeInDirection from './FadeInDirection';
import VsensorAnimate from './VsensorAnimate';
import Image from 'next/image';

const Bagel = ({ title, img, desc }) => {
  const imageSrc = `/static/images/bagels.jpg`;
  return (
    <VsensorAnimate once>
      {({ isVisible }) => (
        <FadeInDirection isVisible={isVisible}>
          <div>
            <div
              className='w-full h-full relative overflow-hidden mb-6 border-m-black border-8 block pb-8'
              style={{ paddingBottom: '67%' }}
            >
              {img ? (
                <Image
                  src={img.node.sourceUrl}
                  alt={title}
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                  style={{ filter: 'saturate(1.2)' }}
                />
              ) : (
                <Image
                  src={imageSrc}
                  alt={title}
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                  style={{ filter: 'saturate(1.2)' }}
                />
              )}
            </div>
            <h4 className='text-xl font-bold tracking-tighter leading-tight font-serif'>
              {title}
            </h4>
            {desc && (
              <p className='text-base font-normal tracking-tighter leading-tight font-sans'>
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

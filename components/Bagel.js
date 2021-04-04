import React from 'react';
import styles from './bagel.module.css';
import { Spring } from 'react-spring';
import dynamic from 'next/dynamic';
import Img from 'next/image';

const Bagel = ({ title, img, desc }) => {
  const VsensorAnimate = dynamic(import('./VsensorAnimate'));
  const imageSrc = `/static/images/bagels.jpg`;
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
              <div className='w-full overflow-hidden mb-6 border-black border-12'>
                {img ? (
                  <Img
                    className='object-cover h-48 w-full object-top'
                    src={img.node.sourceUrl}
                    alt={title}
                    layout='responsive'
                  />
                ) : (
                  <Img
                    className='object-cover h-48 w-full object-top'
                    src={imageSrc}
                    alt={title}
                    layout='responsive'
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
          )}
        </Spring>
      )}
    </VsensorAnimate>
  );
};

export default Bagel;

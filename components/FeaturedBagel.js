import React from 'react';
import styles from './featuredBagel.module.css';
import Img from 'next/image';

const FeaturedBagel = ({ title, subtitle, img }) => {
  return (
    <section className='mt-32 md:mt-48 px-5 py-6 flex-col md:flex-row flex lg:items-center md:justify-between mb-16 md:mb-24 md:px-4 md:py-4 xl:mt-32 border-m-yellow border-8'>
      <div className={`mb-6 md:mb-0 flex-1 md:mr-8 lg:mr-16`}>
        <Img
          src='/static/images/penguin-city-pretzel.jpg'
          alt='bagel'
          width={1440}
          height={1440}
        />
      </div>
      <div className={`flex-1 relative`}>
        <h3 className='text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-10 font-serif mb-4'>
          <div className='w-full overflow-hidden mb-6'>
            <img
              className='object-contain'
              src={img.sourceUrl}
              alt={title}
              width='200'
            />
          </div>
        </h3>
        <h4 className='text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
          {subtitle}
        </h4>
      </div>
    </section>
  );
};

export default FeaturedBagel;

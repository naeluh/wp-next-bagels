import React from 'react';
import styles from './featuredBagel.module.css';

const featuredBagel = ({ title, subtitle, img }) => {
  return (
    <section className='px-5 py-8 flex-col md:flex-row flex lg:items-center md:justify-between mb-16 md:mb-24 md:px-8 md:py-8 md:pb-12 border-yellow-500 border-12'>
      <div className={`mb-6 md:mb-0 flex-1 md:mr-8 lg:mr-16`}>
        <img
          className={`object-cover h-full w-full relative`}
          src='/static/images/penguin-city-pretzel.jpg'
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
        {/* <div className='text-lg leading-relaxed mb-4'>
          <p>{desc}</p>
        </div> */}
      </div>
    </section>
  );
};

export default featuredBagel;

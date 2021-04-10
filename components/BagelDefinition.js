import React from 'react';
import { image } from './bagelDefinition.module.css';

const BagelDefinition = ({ title, quote, desc }) => {
  return (
    <section
      style={{
        backgroundImage: `url('/static/images/the-mamalagel.jpg')`,
      }}
      className={` ${image} text-center z-0 px-5 py-32 bg-cover bg-center flex-col flex md:flex-row md:justify-between mb-16 md:mb-12 md:px-32 md:py-64 lg:items-center`}
    >
      <div className='flex-1 z-10'>
        <h3 className='text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-4 text-white font-serif'>
          {title}
        </h3>
        <span className={borderBottom}></span>
        <h4 className='text-2xl md:text-4xl font-regular tracking-tighter leading-tight mb-4 text-white font-serif'>
          {quote}
        </h4>
        <div>
          <p className='text-lg leading-relaxed text-white font-medium'>
            {desc}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BagelDefinition;

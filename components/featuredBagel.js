import React from 'react';

const featuredBagel = ({ title, subtitle, desc }) => {
  return (
    <section className='px-5 py-8 flex-col md:flex-row flex lg:items-center md:justify-between mb-16 md:mb-12 md:p-8 border-yellow-500 border-12'>
      <div className='mb-6 md:mb-0 flex-1 md:mr-4 lg:mr-8'>
        <img
          className='object-cover w-full'
          src='/static/images/the-mamalagel.jpg'
        />
      </div>
      <div className='flex-1'>
        <h3 className='text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
          {title}
        </h3>
        <h4 className='text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
          {subtitle}
        </h4>
        <div class='text-lg leading-relaxed mb-4'>
          <p>{desc}</p>
        </div>
      </div>
    </section>
  );
};

export default featuredBagel;

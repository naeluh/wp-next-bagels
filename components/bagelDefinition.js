import React from 'react';

const bagelDefinition = ({ title, quote, desc }) => {
  return (
    <section
      style={{
        backgroundImage: `url('/static/images/penguin-city-pretzel.jpg')`,
      }}
      className='px-5 pt-32 pb-32 bg-cover bg-center flex-col md:flex-row flex lg:items-center md:justify-between mb-16 md:mb-12 md:pl-8 md:pr-8 md:pt-64 md:pb-64 border-yellow-500 border-12 from-orange-900'
    >
      <div className='flex-1'>
        <h3 className='text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-white'>
          {title}
        </h3>
        <h4 className='text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-white'>
          {quote}
        </h4>
        <div class='text-lg leading-relaxed mb-4 text-white'>
          <p>{desc}</p>
        </div>
      </div>
    </section>
  );
};

export default bagelDefinition;

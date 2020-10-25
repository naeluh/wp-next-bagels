import React from 'react';
import styles from './bagelDefinition.module.css';

const bagelDefinition = ({ title, quote, desc }) => {
  return (
    <section
      style={{
        backgroundImage: `url('/static/images/penguin-city-pretzel.jpg')`,
      }}
      className={`${styles.image} text-center z-0 px-5 py-32 bg-cover bg-center flex-col flex md:flex-row md:justify-between mb-16 md:mb-12 md:px-32 md:py-64 lg:items-center`}
    >
      <div className='flex-1 z-10'>
        <h3 className='text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-white'>
          {title}
        </h3>
        <span className={styles.borderBottom}></span>
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

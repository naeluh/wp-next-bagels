import React, { FC } from 'react';
import Image from 'next/image';
import styles from './bagel.module.css';

const FeaturedBagel: FC<{
  title?: string;
  subtitle?: string;
  img?: { sourceUrl?: string | undefined | null };
}> = ({ title, subtitle, img }) => {
  const imgSrc = img ? `${img.sourceUrl}` : ``;
  return (
    <section className=' w-full px-5 py-6 flex-col md:flex-row flex lg:items-center md:justify-between mb-16 md:mb-24 md:px-4 md:py-4 border-m-yellow border-8'>
      <div className='relative mb-6 md:mb-0 flex-1 md:mr-8 lg:mr-16 w-full h-full'>
        {img ? (
          <span
            className={[
              'w-full h-full relative overflow-hidden block mb-8',
              styles.bagelIcon,
              styles.bagelImage,
            ].join(' ')}
          >
            <Image
              src={imgSrc}
              alt='the mamalagel'
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              className={styles.bagelStyles}
            />
          </span>
        ) : (
          <Image
            src='/static/images/penguin-city-pretzel.jpg'
            alt='the mamalagel'
            width={1440}
            height={1440}
            quality={50}
          />
        )}
      </div>
      <div className='flex-1 relative'>
        {img && (
          <div className='text-4xl md:text-6xl md:pr-10 mb-4'>
            <div className='w-full overflow-hidden mb-6'>
              <img
                className='object-contain'
                src='/static/images/mamalagels-notag.png'
                alt={title}
                width='200'
              />
            </div>
          </div>
        )}
        {subtitle && (
          <h2 className='text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
            {subtitle}
          </h2>
        )}
      </div>
    </section>
  );
};

export default FeaturedBagel;

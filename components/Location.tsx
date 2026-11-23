import React from 'react';
import FadeInDirection from './FadeInDirection';
import Image from 'next/image';
import styles from './bagel.module.css';
import type { LocationTime, WPImage } from '../lib/types';

type Props = {
  title: string;
  img?: { node: WPImage } | null;
  times: NonNullable<NonNullable<LocationTime['dateTime']>['dateAndTime']>;
};

const Location = ({ title, img, times }: Props) => {
  // Upcoming = a valid date after today. Unparseable values are skipped instead of crashing.
  const isUpcoming = (date?: string | null): date is string => {
    const d = date ? new Date(date) : null;
    return !!d && !isNaN(+d) && d.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
  };

  const convertDateFormat = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <FadeInDirection>
      <div className={styles.bagelContainer}>
        <h5
          className={[
            'text-xl font-bold tracking-tighter leading-tight font-serif mb-2',
            styles.bagelHeader,
          ].join(' ')}
        >
          <span
            className={[
              'w-full h-full relative overflow-hidden block mb-8',
              styles.bagelIcon,
              styles.bagelImage,
            ].join(' ')}
          >
            <Image
              src={img ? img.node.sourceUrl : `/static/images/tent.jpg`}
              alt={title}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '0.5em',
              }}
              className={styles.bagelStyles}
            />
          </span>
          <span className={styles.borderBottom}></span>
          <span className={styles.bagelText}>{title}</span>
        </h5>
        <span className='text-base font-normal tracking-tighter leading-tight font-sans text-left mt-2'>
          {[...times.map(t => t.textDate), ...times.map(t => t.dateAndTime)]
            .filter(isUpcoming)
            .map((date, index) => (
              <span key={`time_${index}`}>
                {(index ? ', ' : '') + convertDateFormat(date)}
              </span>
            ))}
        </span>
      </div>
    </FadeInDirection>
  );
};

export default Location;

import React from 'react';
import FadeInDirection from './FadeInDirection';
import VsensorAnimate from './VsensorAnimate';
import Image from 'next/image';
import styles from './bagel.module.css';

const Location = ({ title, img, times }) => {
  const dateInPast = (firstDate, secondDate) => {
    if (!firstDate || !secondDate) return;
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }

    return false;
  };

  const formatDate = date => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
  };

  const convertDateFormat = date =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <VsensorAnimate once>
      {({ isVisible }) => (
        <FadeInDirection isVisible={isVisible}>
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
              {times
                .filter(
                  ({ textDate }) =>
                    textDate &&
                    !dateInPast(formatDate(textDate.toString()), new Date())
                )
                .map(
                  ({ textDate }, index) =>
                    textDate && (
                      <span key={`time_${index}`}>
                        {(index ? ', ' : '') +
                          convertDateFormat(textDate.toString())}
                      </span>
                    )
                )}
              {times
                .filter(
                  ({ dateAndTime }) =>
                    dateAndTime &&
                    !dateInPast(
                      new Date(formatDate(dateAndTime.toString())),
                      new Date()
                    )
                )
                .map(
                  ({ dateAndTime }, index) =>
                    dateAndTime && (
                      <span key={`time_${index}`}>
                        {(index ? ', ' : '') +
                          convertDateFormat(dateAndTime.toString())}
                      </span>
                    )
                )}
            </span>
          </div>
        </FadeInDirection>
      )}
    </VsensorAnimate>
  );
};

export default Location;

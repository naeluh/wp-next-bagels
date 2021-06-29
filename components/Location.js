import React from 'react';
import FadeInDirection from './FadeInDirection';
import VsensorAnimate from './VsensorAnimate';
import Image from 'next/image';

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
          <div>
            <div
              className='w-full h-full relative overflow-hidden mb-6 border-m-yellow border-8 block pb-8'
              style={{ paddingBottom: '67%' }}
            >
              <Image
                src={img ? img.node.sourceUrl : `/static/images/tent.jpg`}
                alt={title}
                layout='fill'
                objectFit='cover'
                objectPosition='center'
                style={{ filter: 'saturate(1.2)' }}
              />
            </div>
            <h4 className='text-xl font-bold tracking-tighter leading-tight font-serif mb-2'>
              {title}
            </h4>
            {times
              .filter(
                ({ textDate }) =>
                  textDate &&
                  !dateInPast(formatDate(textDate.toString()), new Date())
              )
              .map(
                ({ textDate }, index) =>
                  textDate && (
                    <span
                      className='text-base font-normal tracking-tighter leading-tight font-sans'
                      key={`time_${index}`}
                    >
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
                    <span
                      className='text-base font-normal tracking-tighter leading-tight font-sans'
                      key={`time_${index}`}
                    >
                      {(index ? ', ' : '') +
                        convertDateFormat(dateAndTime.toString())}
                    </span>
                  )
              )}
          </div>
        </FadeInDirection>
      )}
    </VsensorAnimate>
  );
};

export default Location;

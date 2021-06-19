import React from 'react';
import FadeInDirection from './FadeInDirection';
import VsensorAnimate from './VsensorAnimate';
import Image from 'next/image';
import moment from 'moment';

const Location = ({ title, img, times }) => {
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
            {times.map(
              ({ textDate }, index) =>
                textDate && (
                  <span
                    className='text-base font-normal tracking-tighter leading-tight font-sans'
                    key={`time_${index}`}
                  >
                    {(index ? ', ' : '') +
                      moment(textDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                  </span>
                )
            )}
            {times.map(
              ({ dateAndTime }, index) =>
                dateAndTime && (
                  <span
                    className='text-base font-normal tracking-tighter leading-tight font-sans'
                    key={`time_${index}`}
                  >
                    {(index ? ', ' : '') +
                      moment(dateAndTime).format('MMMM Do YYYY')}
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

import React from 'react';

import styles from './locationsTimes.module.css';
import Location from './Location';
import type { Edge, LocationTime } from '../lib/types';

type Props = {
  locations: Edge<LocationTime>[];
};

const LocationsTimes = ({ locations }: Props) => {
  return (
    <>
      <section
        className={`text-center z-0 py-4 bg-cover bg-center flex-col flex md:flex-row md:justify-between mb-4 md:mb-6 md:px-12 md:py-6 lg:items-center`}
      >
        <div className='flex-1'>
          <h3 className='text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-black'>
            {'Locations & Times'}
          </h3>
          <span className={styles.borderBottom}></span>
        </div>
      </section>
      {locations.length === 0 ? (
        <p className='text-center text-2xl font-serif font-bold mb-12'>
          No locations and times at this time.
        </p>
      ) : (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
          {locations.map(({ node }) => (
            <Location
              title={node.title}
              img={node.featuredImage}
              times={node.dateTime?.dateAndTime ?? []}
              key={node.id}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default LocationsTimes;

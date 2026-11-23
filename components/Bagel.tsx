import React from 'react';
import styles from './bagel.module.css';
import FadeInDirection from './FadeInDirection';
import type { WPImage } from '../lib/types';

type Props = {
  title: string;
  desc?: string;
  img?: { node: WPImage } | null;
};

const Bagel = ({ title, desc }: Props) => {
  return (
    <FadeInDirection>
      <div className={styles.bagelContainer}>
        <h5
          className={[
            'text-3xl font-semibold tracking-tighter leading-tight font-serif',
            styles.bagelHeader,
          ].join(' ')}
        >
          <span className={styles.bagelIcon}></span>
          <span className={styles.bagelText}>{title}</span>
        </h5>

        {desc && (
          <p className='text-base font-normal tracking-tighter leading-tight font-sans'>
            {desc}
          </p>
        )}
      </div>
    </FadeInDirection>
  );
};

export default Bagel;

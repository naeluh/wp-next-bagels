import React from 'react';
import styles from './FullWidthHero.module.css';

import Image from 'next/image';

type FullWidthHeroVars = {
  image: any;
};

const FullWidthHero = ({ image }: FullWidthHeroVars) => {
  return (
    <div className={`${styles.flex} bg-cover bg-no-repeat bg-center`}>
      <div
        className={`${styles.backgroundimage} bg-cover bg-no-repeat bg-center pb-96 bg-m-yellow`}
      >
        <Image
          alt='bagels'
          src={image}
          layout='fill'
          objectFit='cover'
          quality={100}
        />
      </div>
    </div>
  );
};

export default FullWidthHero;

import { url } from 'inspector';
import React from 'react';
import styles from './FullWidthHero.module.css';

type FullWidthHeroVars = {
  image: any;
};

const FullWidthHero = ({ image }: FullWidthHeroVars) => {
  return (
    <div className={`${styles.flex} bg-cover bg-no-repeat bg-center`}>
      <div
        className={`${styles.backgroundimage} bg-cover bg-no-repeat bg-center pb-96 bg-m-yellow`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
    </div>
  );
};

export default FullWidthHero;

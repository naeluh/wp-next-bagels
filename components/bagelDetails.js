import React from 'react';

import styles from './bagelDetails.module.css';
import Bagel from './Bagel';

const BagelDetails = ({ bagels }) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
      {bagels.map(
        ({ bagelTitle, bagelDescription, bagelImage, price }, index) => (
          <Bagel
            title={bagelTitle}
            desc={bagelDescription}
            price={price}
            img={bagelImage}
            key={bagelTitle + index}
          />
        )
      )}
    </section>
  );
};

export default BagelDetails;

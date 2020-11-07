import React from 'react';

import styles from './bagelDetails.module.css';
import Bagel from './bagel';

const bagelDetails = ({ bagels }) => {
  console.log(bagels);
  return (
    <section>
      {bagels.map(({ bagelTitle, bagelDescription, price }, index) => (
        <Bagel
          title={bagelTitle}
          desc={bagelDescription}
          price={price}
          key={bagelTitle + index}
        />
      ))}
    </section>
  );
};

export default bagelDetails;

import React from 'react';

import styles from './bagelDetails.module.css';
import Bagel from './Bagel';

const BagelDetails = ({ bagels }) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
      {bagels.map(({ node }) => (
        <Bagel
          title={node.title}
          desc={node.bagelInfo.bagelDescription}
          price={node.bagelInfo.price}
          img={node.bagelInfo.bagelImage}
          key={node.title}
        />
      ))}
    </section>
  );
};

export default BagelDetails;

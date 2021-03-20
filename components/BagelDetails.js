import React from 'react';
import dynamic from 'next/dynamic';
import styles from './bagelDetails.module.css';

const BagelDetails = ({ bagels }) => {
  const Bagel = dynamic(import('./Bagel'));
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
      {bagels.map(({ node }) => (
        <Bagel
          title={node.title}
          desc={node.content}
          img={node.featuredImage}
          key={node.id}
        />
      ))}
    </section>
  );
};

export default BagelDetails;

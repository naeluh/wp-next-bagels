import React from 'react';
import Bagel from './Bagel';

const BagelDetails = ({ bagels }) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
      {bagels.map(({ node }, index) => (
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

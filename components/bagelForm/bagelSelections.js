import React, { useState } from 'react';
import BagelNumberField from './bagelNumberField';

const bagelSelections = ({ bagelData, bagelSetType, id, bagels, control }) => {
  console.log(control);
  return (
    <div>
      <section>
        <h5 className='text-lg font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-black'>
          {bagelSetType}
        </h5>
        <h5 className='text-lg font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-black'>
          {bagels}
        </h5>
        <label>Select Bagels</label>
        {bagelData.map(bagel => (
          <BagelNumberField
            control={control}
            bagel={bagel}
            id={id}
            bagels={bagels}
            key={bagel.node.bagelInfo.bagelTitle}
          />
        ))}
      </section>
    </div>
  );
};

export default bagelSelections;

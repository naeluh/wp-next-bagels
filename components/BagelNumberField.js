import React, { useState, useEffect } from 'react';
import {
  outerNumberContainer,
  numberContainer,
  add,
  remove,
  errorColor,
  limit,
} from './bagelNumberField.module.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Image from 'next/image';

const BagelNumberField = ({
  control,
  bagel,
  setTotalBagels,
  totalBagels,
  amount,
  bagelSet,
}) => {
  const imageSrc = `/static/images/bagels.jpg`;
  const [currentValue, setCurrentValue] = useState(
    bagelSet
      ? bagelSet.bagels.filter(b => b.key === bagel.node.title)[0].value
      : control.defaultValuesRef.current.bagelVal
  );

  useEffect(() => {
    const vals = control.getValues();
    const valArr = Object.keys(vals).map(key => vals[key]);
    const sum = valArr.reduce((a, b) => a + b, 0);
    setTotalBagels(sum);
  }, [currentValue]);

  console.log(bagel.node.featuredImage);

  return (
    <div className={outerNumberContainer}>
      <label className='text-xl md:text-2xl tracking-tighter leading-tight md:pr-8 font-serif font-black text-black px-5 flex items-center justify-center'>
        {bagel.node.title}
      </label>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '0',
          paddingBottom: '67%',
        }}
      >
        <Image
          src={
            bagel.node.featuredImage
              ? bagel.node.featuredImage.node.sourceUrl
              : imageSrc
          }
          alt={bagel.node.title}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div>

      <div className={numberContainer}>
        <button
          type='button'
          variant='contained'
          onClick={() => {
            totalBagels !== amount &&
              currentValue <= 12 &&
              setCurrentValue(currentValue + 1);
          }}
          className={`${add} add ${totalBagels >= amount && limit}`}
        >
          <AddIcon />
        </button>

        <input
          ref={control.register({
            min: 0,
            max: amount,
            valueAsNumber: true,
            valueAsDate: true,
          })}
          className='quantity font-serif font-black'
          min='0'
          max='12'
          type='number'
          step='1'
          name={bagel.node.title}
          value={currentValue}
          readOnly
        />

        <button
          type='button'
          variant='contained'
          onClick={() => {
            currentValue <= 12 &&
              currentValue >= 1 &&
              setCurrentValue(currentValue - 1);
          }}
          className={`${remove} remove ${totalBagels >= amount && limit}`}
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
};

export default BagelNumberField;

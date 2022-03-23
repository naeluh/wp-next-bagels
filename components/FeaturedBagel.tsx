import React, { useState, useEffect, FC } from 'react';
import Img from 'next/image';
import Link from 'next/link';
import Button from './Button';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import useWindowDimensions from '../hooks/useWindowDimensions';

const Links: FC<{ wrapperClass?: string }> = ({ wrapperClass }) => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { state } = useStateMachine({ updateAction });
  const { bagelChips, bagelSelections, brunchBag } = state.data;
  const { bags } = brunchBag;
  const hideBagelChips =
    Object.values(bagelChips).reduce((a, b) => a + b, 0) === 0 ? false : true;
  const [active, setActive] = useState(false);
  const [editBagels, setEditBagels] = useState('');
  const [editBags, setEditBags] = useState('');

  useEffect(() => {
    setEditBagels(
      hideBagelChips || bagelSelections.length > 0 ? 'Edit ' : 'Buy '
    );
  }, [hideBagelChips, bagelSelections, bags, state]);

  return (
    <div className={wrapperClass}>
      <Link href='/bagels'>
        <a>
          <Button
            type={'button'}
            text={`${editBagels}Bagels & Bagels Chips`}
            disabled={false}
            style={{
              marginTop: 0,
              transition: 'all .15s ease',
              fontSize: '16px',
            }}
            fullWidth={true}
            onClick={() =>
              router.pathname === '/bagels' &&
              width &&
              width <= 1024 &&
              setActive(!active)
            }
          />
        </a>
      </Link>
    </div>
  );
};

const FeaturedBagel: FC<{
  title?: string;
  subtitle?: string;
  img?: { sourceUrl?: string };
}> = ({ title, subtitle, img }) => {
  return (
    <section className='mt-32 md:mt-48 px-5 py-6 flex-col md:flex-row flex lg:items-center md:justify-between mb-16 md:mb-24 md:px-4 md:py-4 xl:mt-32 border-m-yellow border-8'>
      <div className='mb-6 md:mb-0 flex-1 md:mr-8 lg:mr-16'>
        <Links wrapperClass='flex flex-col md:hidden' />
        <Img
          src='/static/images/penguin-city-pretzel.jpg'
          alt='bagel'
          width={1440}
          height={1440}
          quality={50}
        />
      </div>
      <div className='flex-1 relative'>
        <Links wrapperClass='hidden md:flex md:flex-col lg:hidden' />
        {img && (
          <div className='text-4xl md:text-6xl md:pr-10 mb-4'>
            <div className='w-full overflow-hidden mb-6'>
              <img
                className='object-contain'
                src={img.sourceUrl}
                alt={title}
                width='200'
              />
            </div>
          </div>
        )}
        {subtitle && (
          <h2 className='text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4'>
            {subtitle}
          </h2>
        )}
      </div>
    </section>
  );
};

export default FeaturedBagel;
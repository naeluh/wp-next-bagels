import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './Button';
import Image from 'next/image';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const { state } = useStateMachine({ updateAction });
  const { bagelChips, bagelSelections, brunchBag } = state.data;
  const { bags } = brunchBag;
  const hideBagelChips =
    Object.values(bagelChips).reduce((a, b) => a + b, 0) === 0 ? false : true;
  const [active, setActive] = useState(false);
  const [editBagels, setEditBagels] = useState('');
  const [editBags, setEditBags] = useState('');
  const image = (
    <Image
      src='/static/images/mamalagels-notag.png'
      alt='Mamalagels'
      layout='fixed'
      width={175}
      height={88}
    />
  );

  useEffect(() => {
    setEditBags(bags.length > 0 ? 'Edit ' : '');
    setEditBagels(hideBagelChips || bagelSelections.length > 0 ? 'Edit ' : '');
  }, [hideBagelChips, bagelSelections, bags, state]);

  return (
    <nav
      className={` ${
        active ? `bg-white z-10 h-screen` : `bg-transparent`
      } lg:h-auto lg:bg-transparent mx-auto px-5 py-5 flex lg:items-center justify-between fixed top-0 w-full flex-col lg:flex-row z-10`}
    >
      <div className='flex flex-row justify-between w-full lg:flex-1 mr-4'>
        <Link href='/'>
          <a>{image}</a>
        </Link>
        <div
          onClick={() => setActive(!active)}
          className={`lg:hidden tham tham-e-squeeze tham-w-8 ${
            active ? `tham-active` : ``
          }`}
        >
          <div className='tham-box'>
            <div className='tham-inner bg-m-yellow' />
          </div>
        </div>
      </div>

      <ul
        className={`lg:justify-end flex-3 lg:flex lg:flex-row ${
          active ? `active` : `hidden`
        }`}
        style={{
          flex: '1 1 25%',
          maxWidth: '700px',
          justifyContent: 'space-between',
        }}
      >
        <li className='mr-2'>
          <Link href='/bagels'>
            <a>
              <Button
                type={'button'}
                text={`${editBagels}Bagels & Bagels Chips`}
                disabled={false}
                style={{
                  transition: 'all .15s ease',
                  fontSize: '14px',
                }}
                fullWidth={false}
                onClick={() =>
                  router.pathname === '/bagels' && setActive(!active)
                }
              />
            </a>
          </Link>
        </li>
        <li className='mr-2'>
          <Link href='/brunch-bag'>
            <a>
              <Button
                type={'button'}
                text={`${editBags}Brunch Bags`}
                disabled={false}
                style={{
                  transition: 'all .15s ease',
                  fontSize: '14px',
                }}
                fullWidth={false}
                onClick={() =>
                  router.pathname === '/brunch-bag' && setActive(!active)
                }
              />
            </a>
          </Link>
        </li>
        <li className=''>
          <Link href='/special-request'>
            <a>
              <Button
                type={'button'}
                text={'Special Request'}
                disabled={false}
                style={{
                  transition: 'all .15s ease',
                  fontSize: '14px',
                }}
                fullWidth={false}
                onClick={() =>
                  router.pathname === '/special-request' && setActive(!active)
                }
              />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

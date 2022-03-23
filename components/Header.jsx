import React, { useState, useEffect, FC } from 'react';
import Link from 'next/link';
import Button from './Button';
import Image from 'next/image';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import useWindowDimensions from '../hooks/useWindowDimensions';
import * as styles from './Header.module.css';

const Header = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { state } = useStateMachine({ updateAction });
  const { bagelChips, bagelSelections, brunchBag } = state.data;
  const { bags } = brunchBag;
  const hideBagelChips =
    Object.values(bagelChips).reduce((a, b) => a + b, 0) === 0 ? false : true;
  const [active, setActive] = useState(false);
  const [editBagels, setEditBagels] = useState('');

  useEffect(() => {
    setEditBagels(
      hideBagelChips || bagelSelections.length > 0 ? 'Edit ' : 'Buy '
    );
  }, [hideBagelChips, bagelSelections, bags, state]);

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      if (active) {
        html.style.overflow = 'hidden';
      } else {
        html.style.overflow = '';
      }
    }
  }, [active]);

  return (
    <nav
      className={` ${
        active ? `bg-white z-10 h-screen` : `bg-transparent`
      } lg:h-auto lg:bg-transparent mx-auto px-5 py-5 flex lg:items-center absolute top-0 w-full flex-col lg:flex-row z-10`}
    >
      <div className='flex flex-row justify-between w-full lg:flex-1 mr-4'>
        <Link href='/'>
          <a>
            <Image
              src='/static/images/mamalagels-notag.png'
              alt='Mamalagels'
              layout='fixed'
              width={175}
              height={88}
            />
          </a>
        </Link>
        <div
          onClick={() => setActive(!active)}
          className={`lg:hidden tham tham-e-squeeze tham-w-8 ${
            active ? `tham-active` : ``
          }`}
        >
          <div className='tham-box'>
            <div className={['tham-inner font-bold font-sans'].join(' ')}>
              <span
                className={[
                  styles.menuButton,
                  router.pathname === '/brunch-bag' ||
                  router.pathname === '/bagels'
                    ? styles.variantColor
                    : '',
                  'tham-inner-span',
                ].join(' ')}
              ></span>
            </div>
          </div>
        </div>
      </div>

      <ul
        className={`lg:justify-end flex-3 lg:flex lg:flex-row ${
          active ? `active` : `hidden`
        }`}
        style={{
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
                  router.pathname === '/bagels' &&
                  width &&
                  width <= 1024 &&
                  setActive(!active)
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
                text={'Special 🥯 Request'}
                disabled={false}
                style={{
                  transition: 'all .15s ease',
                  fontSize: '14px',
                }}
                fullWidth={false}
                onClick={() =>
                  router.pathname === '/special-request' &&
                  width &&
                  width <= 1024 &&
                  setActive(!active)
                }
              />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
import React, { useState } from 'react';
import Link from 'next/link';
import Button from './Button';
import Image from 'next/image';

export default function Header() {
  const [active, setActive] = useState(false);
  const image = (
    <Image
      src='/static/images/mamalagels-notag.png'
      alt='Mamalagels'
      layout='fixed'
      width={175}
      height={88}
    />
  );
  return (
    <nav
      className={` ${
        active ? `bg-white z-10 h-screen` : `bg-transparent`
      } sm:h-auto sm:bg-transparent mx-auto px-5 py-5 flex sm:items-center justify-between fixed top-0 w-full flex-col sm:flex-row z-10`}
    >
      <div className='flex flex-row justify-between w-full sm:flex-1'>
        <Link href='/'>
          <a>{image}</a>
        </Link>
        <div
          onClick={() => setActive(!active)}
          className={`sm:hidden tham tham-e-squeeze tham-w-8 ${
            active ? `tham-active` : ``
          }`}
        >
          <div className='tham-box'>
            <div className='tham-inner bg-m-yellow' />
          </div>
        </div>
      </div>

      <ul
        className={`sm:justify-end flex-1 sm:flex sm:flex-row ${
          active ? `active` : `hidden`
        }`}
      >
        <li className='pr-5'>
          <Link href='/bagels'>
            <a>
              <Button
                type={'button'}
                text={'Bagels'}
                disabled={false}
                style={{ transition: 'all .15s ease' }}
                fullWidth={false}
                onClick={() => {}}
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
                style={{ transition: 'all .15s ease' }}
                fullWidth={false}
                onClick={() => {}}
              />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

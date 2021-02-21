import React, { useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Button from './Button';

export default function Header() {
  const [active, setActive] = useState(false);
  const image = (
    <img
      src='https://mamalagels.com/wp-content/uploads/2019/04/mamalagels-notag.png?fit=400%2C200&ssl=1'
      alt='Mamalagels'
      width='175'
    />
  );
  return (
    <nav
      className={` ${
        active ? `bg-white z-10 h-screen` : `bg-transparent`
      } sm:h-auto sm:bg-transparent mx-auto px-5 py-5 flex sm:items-center justify-between fixed top-0 w-full flex-col sm:flex-row`}
    >
      <div className='flex flex-row justify-between w-full flex-1'>
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
            <div className='tham-inner bg-m-black' />
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
              />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

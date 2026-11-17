'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { CMS_NAME } from '../lib/constants';
import Container from '../components/Container';
import Header from '../components/Header';

export default function NotFound() {
  useEffect(() => document.body.classList.remove('modal-open'));

  return (
    <>
      <Header />
      <Container>
        <div className='flex flex-col justify-center items-center w-full h-screen absolute top-0 left-0'>
          <Image
            src='/static/images/mamalagels-notag.png'
            alt='Mamalagels'
            width={175}
            height={88}
            priority
          />
          <p className=' text-3xl mt-6 font-black font-serif'>
            🥯 Whoops ! Page not found ! 🥯
          </p>
        </div>
      </Container>
    </>
  );
}

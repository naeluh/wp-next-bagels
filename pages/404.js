// pages/404.js

import { useEffect } from 'react';
import { CMS_NAME } from '../lib/constants';
import Container from '../components/Container';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Image from 'next/image';

export default function Custom404({}) {
  useEffect(() => document.body.classList.remove('modal-open'));

  return (
    <Layout
      title={`${CMS_NAME} 🥯 Page Not Found`}
      desc={`${CMS_NAME} Home of the signature Mămălagel 🥯`}
    >
      <Header />
      <Container>
        <div className='flex flex-col justify-center items-center w-full h-screen absolute top-0 left-0'>
          <Image
            src='/static/images/mamalagels-notag.png'
            alt='Mamalagels'
            fixed
            width={175}
            height={88}
            priority
          />
          <p className=' text-3xl mt-6 font-black font-serif'>
            🥯 Whoops ! Page not found ! 🥯
          </p>
        </div>
      </Container>
    </Layout>
  );
}

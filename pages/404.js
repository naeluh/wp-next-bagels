// pages/404.js

import Head from 'next/head';
import { useEffect } from 'react';
import { CMS_NAME } from '../lib/constants';
import Container from '../components/Container';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Image from 'next/image';

export default function Custom404({}) {
  useEffect(() => document.body.classList.remove('modal-open'));

  return (
    <Layout>
      <Head>
        <title>{CMS_NAME} 🥯 Page Not Found</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header />
      <Container>
        <div className='flex flex-col justify-center items-center w-full h-screen absolute top-0 left-0'>
          <Image
            src='/static/images/mamalagels-notag.png'
            alt='Mamalagels'
            layout='fixed'
            width={175}
            height={88}
          />
          <p className=' text-3xl mt-6 font-black font-serif'>
            🥯 Whoops ! Page not found ! 🥯
          </p>
        </div>
      </Container>
    </Layout>
  );
}

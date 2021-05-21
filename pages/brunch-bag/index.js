import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { CMS_NAME } from '../../lib/constants';
import { getDataQuery } from '../../lib/queries';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import FullWidthHero from '../../components/FullWidthHero';
import fetch from '../../lib/graphqlFetch';
import Image from 'next/image';
import useSWR from 'swr';
import AddBrunchBag from '../../components/AddBrunchBag';
import unfetch from 'unfetch';
import CheckZipCode from '../../components/CheckZipCode';

const getData = async (...args) => {
  return await fetch(getDataQuery);
};

const fetcher = async url => {
  const r = await unfetch(url);
  const json = await r.json();
  return json;
};

export default function Index() {
  const { data, error } = useSWR(getDataQuery, getData);
  const response = useSWR('/api/bags', fetcher);
  const [checkZip, setCheckZip] = useState(true);

  if (checkZip) {
    return <CheckZipCode checkZip={checkZip} setCheckZip={setCheckZip} />;
  }

  if (error && response.error) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-screen'>
        <Image
          src='/static/images/mamalagels-notag.png'
          alt='Mamalagels'
          layout='fixed'
          width={175}
          height={88}
        />
        <p className=' text-3xl font-serif mt-6 font-black text-m-red'>
          Error 🥯
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-screen'>
        <Image
          src='/static/images/mamalagels-notag.png'
          alt='Mamalagels'
          layout='fixed'
          width={175}
          height={88}
        />
        <p className=' text-3xl mt-6 font-black font-serif'>Loading... 🥯</p>
      </div>
    );
  }

  return (
    <Layout preview={false}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Header />
      <FullWidthHero image={`/static/images/brunch-bag.jpg`} />
      <Container>
        <AddBrunchBag
          bagelData={data.allBagels.edges}
          pickupLocations={data.pickupLocations.edges}
          bagelChipsData={data.allBagelChips.edges}
          pricing={data.prices.edges}
          brunchBag={response.data}
        />
      </Container>
    </Layout>
  );
}

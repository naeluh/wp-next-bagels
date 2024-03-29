import React, { useState } from 'react';
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
import { getBrunchBagDates, getNavItems } from '../../lib/api';

const getData = async (...args) => {
  return await fetch(getDataQuery);
};

const fetcher = async url => {
  const r = await unfetch(url);
  const json = await r.json();
  return json;
};

export default function Index({ bbDates, getNavItems }) {
  const { data, error } = useSWR(getDataQuery, getData);
  const response = useSWR('/api/bags', fetcher);

  if (error && response.error) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-screen'>
        <Image
          src='/static/images/mamalagels-notag.png'
          alt='Mamalagels'
          fixed
          width={175}
          height={88}
          priority
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
          fixed
          width={175}
          height={88}
          priority
        />
        <p className=' text-3xl mt-6 font-black font-serif'>Loading... 🥯</p>
      </div>
    );
  }

  return (
    <Layout
      preview={false}
      title={`${CMS_NAME} 🥯 Brunch Bags`}
      desc={`${CMS_NAME} Mămălagel's 🥯 Brunch Bags Page`}
    >
      <Header navItems={navItems} />
      <FullWidthHero image={`/static/images/brunch-bag.jpg`} />
      <Container>
        <AddBrunchBag
          bagelData={data.allBagels.edges}
          pickupLocations={data.pickupLocations.edges}
          bagelChipsData={data.allBagelChips.edges}
          pricing={data.prices.edges}
          brunchBag={response.data}
          brunchBagBlackOutDates={bbDates}
        />
      </Container>
    </Layout>
  );
}

export async function getStaticProps(preview = false) {
  const { navItems } = await getNavItems(preview);
  const bbDates = await getBrunchBagDates();
  return {
    props: { bbDates, navItems },
  };
}

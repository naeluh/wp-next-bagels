'use client';

import { getDataQuery } from '../../lib/queries';
import Container from '../../components/Container';
import Header from '../../components/Header';
import FullWidthHero from '../../components/FullWidthHero';
import graphqlFetch from '../../lib/graphqlFetch';
import Image from 'next/image';
import useSWR from 'swr';
import AddBrunchBag from '../../components/AddBrunchBag';

type NavItem = { label: string; url: string };

const getData = async () => {
  return await graphqlFetch(getDataQuery);
};

const fetcher = async (url: string) => {
  const r = await fetch(url);
  const json = await r.json();
  return json;
};

export default function BrunchBagClient({
  navItems,
  bbDates,
}: {
  navItems: NavItem[];
  bbDates: unknown;
}) {
  const { data, error } = useSWR(getDataQuery, getData);
  const bagsResponse = useSWR('/api/bags', fetcher);

  if (error && bagsResponse.error) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-screen'>
        <Image
          src='/static/images/mamalagels-notag.png'
          alt='Mamalagels'
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
          width={175}
          height={88}
          priority
        />
        <p className=' text-3xl mt-6 font-black font-serif'>Loading... 🥯</p>
      </div>
    );
  }

  return (
    <>
      <Header navItems={navItems} />
      <FullWidthHero image={`/static/images/brunch-bag.jpg`} />
      <Container>
        <AddBrunchBag
          bagelData={data.allBagels.edges}
          pricing={data.prices.edges}
          brunchBag={bagsResponse.data}
          brunchBagBlackOutDates={bbDates}
        />
      </Container>
    </>
  );
}

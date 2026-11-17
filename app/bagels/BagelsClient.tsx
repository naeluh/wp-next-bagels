'use client';

import { getDataQuery } from '../../lib/queries';
import Container from '../../components/Container';
import Header from '../../components/Header';
import FullWidthHero from '../../components/FullWidthHero';
import AddGroups from '../../components/AddGroupsForm';
import graphqlFetch from '../../lib/graphqlFetch';
import Image from 'next/image';
import useSWR from 'swr';

type NavItem = { label: string; url: string };

const getData = async () => {
  return await graphqlFetch(getDataQuery);
};

export default function BagelsClient({ navItems }: { navItems: NavItem[] }) {
  const { data, error } = useSWR(getDataQuery, getData);

  if (error) {
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
      <FullWidthHero image={`/static/images/bagels.jpg`} />
      <Container>
        <AddGroups
          bagelData={data.allBagels.edges}
          pickupLocations={data.pickupLocations.edges}
          bagelChipsData={data.allBagelChips.edges}
          pricing={data.prices.edges}
        />
      </Container>
    </>
  );
}

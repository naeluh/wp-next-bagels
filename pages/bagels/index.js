import { CMS_NAME } from '../../lib/constants';
import { getNavItems } from '../../lib/api';
import { getDataQuery } from '../../lib/queries';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import FullWidthHero from '../../components/FullWidthHero';
import AddGroups from '../../components/AddGroupsForm';
import fetch from '../../lib/graphqlFetch';
import Image from 'next/image';
import useSWR from 'swr';

const getData = async (...args) => {
  return await fetch(getDataQuery);
};

export default function Index({ navItems }) {
  const { data, error } = useSWR(getDataQuery, getData);

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-screen'>
        <Image
          src='/static/images/mamalagels-notag.png'
          alt='Mamalagels'
          layout='fixed'
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
          layout='fixed'
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
      title={`${CMS_NAME} 🥯 Bagels and Bagel Chips`}
      desc={`${CMS_NAME} Mămălagel's 🥯 Bagels and Bagel Chips Page`}
    >
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
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const { navItems } = await getNavItems(preview);
  return {
    props: {
      preview,
      navItems,
    },
  };
}

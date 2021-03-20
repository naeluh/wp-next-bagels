import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CMS_NAME } from '../../lib/constants';
import {
  getBagelsData,
  getLocationsData,
  getBagelChipsData,
  getPricingData,
  getHomePageData,
} from '../../lib/api';

export default function Index({
  preview,
  homeData,
  allBagels,
  allPickupLocations,
  allBagelChips,
  allPricing,
}) {
  const Container = dynamic(import('../../components/Container'));
  const Header = dynamic(import('../../components/Header'));
  const Layout = dynamic(import('../../components/Layout'));
  const FullWidthHero = dynamic(import('../../components/FullWidthHero'));
  const AddGroups = dynamic(import('../../components/AddGroupsForm'));
  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Header />
      <FullWidthHero image={`/static/images/penguin-city-pretzel.jpg`} />
      <Container>
        <AddGroups
          bagelData={allBagels}
          pickupLocations={allPickupLocations}
          bagelChipsData={allBagelChips}
          pricing={allPricing}
        />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ preview = false }) {
  const homeData = await getHomePageData();
  const allBagels = await getBagelsData(preview);
  const allPickupLocations = await getLocationsData(preview);
  const allBagelChips = await getBagelChipsData(preview);
  const allPricing = await getPricingData(preview);
  return {
    props: {
      preview,
      homeData,
      allBagels,
      allPickupLocations,
      allBagelChips,
      allPricing,
    },
  };
}

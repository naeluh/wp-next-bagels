import Head from 'next/head';
import { CMS_NAME } from '../../lib/constants';
import {
  getBagelsData,
  getLocationsData,
  getBagelChipsData,
  getPricingData,
  getHomePageData,
} from '../../lib/api';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import FullWidthHero from '../../components/FullWidthHero';
import AddGroups from '../../components/AddGroupsForm';

export default function Index({
  preview,
  homeData,
  allBagels,
  allPickupLocations,
  allBagelChips,
  allPricing,
}) {
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

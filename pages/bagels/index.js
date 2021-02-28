import Head from 'next/head';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Intro from '../../components/Intro';
import FeaturedBagel from '../../components/FeaturedBagel';

import AddGroups from '../../components/AddGroupsForm';
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
  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Header />
      <Container>
        <FeaturedBagel
          title={homeData.featuredBagel.bagelTitle}
          subtitle={homeData.featuredBagel.bagelSubtitle}
          desc={homeData.featuredBagel.bagelDescription}
          img={homeData.featuredBagel.bagelImage}
        />
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

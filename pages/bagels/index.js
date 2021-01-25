import Head from 'next/head';
import Container from '../../components/container';
import Header from '../../components/header';
import Layout from '../../components/layout';
import Intro from '../../components/intro';
import AddGroups from '../../components/addGroupsForm';
import { CMS_NAME } from '../../lib/constants';
import {
  getBagelsData,
  getLocationsData,
  getBagelChipsData,
  getPricingData,
} from '../../lib/api';

export default function Index({
  preview,
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
        <Intro />
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

export async function getStaticProps({ preview = false }) {
  const allBagels = await getBagelsData(preview);
  const allPickupLocations = await getLocationsData(preview);
  const allBagelChips = await getBagelChipsData(preview);
  const allPricing = await getPricingData(preview);
  return {
    props: {
      preview,
      allBagels,
      allPickupLocations,
      allBagelChips,
      allPricing,
    },
  };
}

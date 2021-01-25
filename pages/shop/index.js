import Head from 'next/head';
import Container from '../../components/container';
import Header from '../../components/header';
import Layout from '../../components/layout';
import Intro from '../../components/intro';

import AddGroups from '../../components/addGroupsForm';

import { getBagelsData, getLocationsData } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';

export default function Index({ preview, allBagels, allPickupLocations }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Header />
      <Container>
        <Intro />
        <AddGroups bagelData={allBagels} pickupLocations={allPickupLocations} />
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const allBagels = await getBagelsData(preview);
  const allPickupLocations = await getLocationsData(preview);
  return {
    props: { preview, allBagels, allPickupLocations },
  };
}

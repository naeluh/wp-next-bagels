import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  getBagelsData,
  getHomePageData,
  getLocationsTimesData,
} from '../lib/api';
import { CMS_NAME } from '../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';

export default function Index({ preview, homeData, allBagels, locationTimes }) {
  const FeaturedBagel = dynamic(import('../components/FeaturedBagel'));
  const BagelDefinition = dynamic(import('../components/BagelDefinition'));
  const BagelList = dynamic(import('../components/BagelList'));
  const BagelDetails = dynamic(import('../components/BagelDetails'));
  const LocationsTimes = dynamic(import('../components/LocationsTimes'));
  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Header />
      <Container>
        {homeData.featuredBagel && (
          <FeaturedBagel
            title={homeData.featuredBagel.bagelTitle}
            subtitle={homeData.featuredBagel.bagelSubtitle}
            desc={homeData.featuredBagel.bagelDescription}
            img={homeData.featuredBagel.bagelImage}
          />
        )}
        {homeData.bagelDefinition && (
          <BagelDefinition
            title={homeData.bagelDefinition.bagelTitle}
            quote={homeData.bagelDefinition.bagelQuote}
            desc={homeData.bagelDefinition.bagelDescription}
          />
        )}
        {homeData.bagelList && (
          <BagelList
            title={homeData.bagelList.bagelListTitle}
            desc={homeData.bagelList.bagelListDescription}
            priceTitle={homeData.bagelList.bagelPriceTitle}
            priceDesc={homeData.bagelList.bagelPriceDescription}
          />
        )}
        {allBagels && <BagelDetails bagels={allBagels} />}
        {locationTimes && <LocationsTimes locations={locationTimes} />}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const homeData = await getHomePageData();
  const allBagels = await getBagelsData(preview);
  const locationTimes = await getLocationsTimesData(preview);
  return {
    props: { preview, homeData, allBagels, locationTimes },
  };
}

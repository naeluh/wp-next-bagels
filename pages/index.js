import Head from 'next/head';
import Container from '../components/Container';
import Header from '../components/Header';
import Layout from '../components/Layout';
import FeaturedBagel from '../components/FeaturedBagel';
import BagelDefinition from '../components/BagelDefinition';
import BagelList from '../components/BagelList';
import BagelDetails from '../components/BagelDetails';
import LocationsTimes from '../components/LocationsTimes';
import { getBagelsData, getHomePageData } from '../lib/api';
import { CMS_NAME } from '../lib/constants';

export default function Index({ preview, homeData, allBagels }) {
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
        {homeData.locationsTimes && (
          <LocationsTimes
            locations={homeData.locationsTimes.location}
            times={homeData.locationsTimes.times}
          />
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const homeData = await getHomePageData();
  const allBagels = await getBagelsData(preview);
  return {
    props: { preview, homeData, allBagels },
  };
}

import Head from 'next/head';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Header from '../components/header';
import Intro from '../components/intro';
import Layout from '../components/layout';
import FeaturedBagel from '../components/featuredBagel';
import BagelDefinition from '../components/bagelDefinition';
import BagelList from '../components/bagelList';
import BagelDetails from '../components/bagelDetails';
import LocationsTimes from '../components/locationsTimes';
import { getAllPostsForHome, getHomePageData } from '../lib/api';
import { CMS_NAME } from '../lib/constants';

export default function Index({ preview, homeData }) {
  console.log(homeData);
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
        {homeData.bagelDetails && (
          <BagelDetails bagels={homeData.bagelDetails.bagel} />
        )}
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
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { preview, homeData },
  };
}

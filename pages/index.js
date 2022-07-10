import { useEffect } from 'react';
import {
  getBagelsData,
  getHomePageData,
  getLocationsTimesData,
  getNavItems,
} from '../lib/api';
import { CMS_NAME } from '../lib/constants';
import Container from '../components/Container';
import Header from '../components/Header';
import Layout from '../components/Layout';
import FeaturedBagel from '../components/FeaturedBagel';
import BagelDefinition from '../components/BagelDefinition';
import BagelList from '../components/BagelList';
import BagelDetails from '../components/BagelDetails';
import LocationsTimes from '../components/LocationsTimes';

export default function Index({
  preview,
  homeData,
  allBagels,
  locationTimes,
  navItems,
}) {
  useEffect(() => document.body.classList.remove('modal-open'));

  return (
    <Layout
      preview={preview}
      title={`${CMS_NAME} 🥯 `}
      desc={`${CMS_NAME} Home of the signature Mămălagel 🥯`}
    >
      <Header navItems={navItems} />
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
  const { navItems } = await getNavItems(preview);
  const homeData = await getHomePageData();
  const allBagels = await getBagelsData(preview);
  const locationTimes = await getLocationsTimesData(preview);
  return {
    props: {
      preview,
      homeData,
      allBagels,
      locationTimes,
      navItems,
    },
  };
}

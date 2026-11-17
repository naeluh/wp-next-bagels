import type { Metadata } from 'next';
import { getHomePageData, getNavItems } from '../lib/api';
import { CMS_NAME } from '../lib/constants';
import Container from '../components/Container';
import Header from '../components/Header';
import FeaturedBagel from '../components/FeaturedBagel';
import BagelDefinition from '../components/BagelDefinition';
import RemoveModalOpenClass from '../components/RemoveModalOpenClass';

export const revalidate = 10;

export const metadata: Metadata = {
  title: `${CMS_NAME} 🥯 `,
  description: `${CMS_NAME} Home of the signature Mămălagel 🥯`,
};

export default async function HomePage() {
  const preview = false;
  const { navItems } = await getNavItems(preview);
  const homeData = await getHomePageData();

  if (!homeData && !(navItems && navItems.length > 0)) {
    return (
      <>
        <RemoveModalOpenClass />
        <Header navItems={navItems} />
        <Container>
          <strong>Could not connect to server ...</strong>
        </Container>
      </>
    );
  }

  return (
    <>
      <RemoveModalOpenClass />
      <Header navItems={navItems} />
      <Container>
        {homeData?.featuredBagel && (
          <FeaturedBagel
            title={homeData.featuredBagel.bagelTitle}
            subtitle={homeData.featuredBagel.bagelSubtitle}
            desc={homeData.featuredBagel.bagelDescription}
            img={homeData.featuredBagel.bagelImage}
          />
        )}
        {homeData?.bagelDefinition && (
          <BagelDefinition
            title={homeData.bagelDefinition.bagelTitle}
            quote={homeData.bagelDefinition.bagelQuote}
            desc={homeData.bagelDefinition.bagelDescription}
          />
        )}
      </Container>
    </>
  );
}

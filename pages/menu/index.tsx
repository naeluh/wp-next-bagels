import React, { FC } from 'react';
import { useEffect } from 'react';
import { getBagelsData, getHomePageData, getNavItems } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import BagelList from '../../components/BagelList';
import BagelDetails from '../../components/BagelDetails';

const Menu: FC<{
  allBagels?: [];
  preview?: boolean;
  navItems?: [];
  homeData?: {
    featuredBagel: {
      bagelTitle: string;
      bagelSubtitle: string;
      bagelDescription: string;
      bagelImage: any;
    };
    bagelDefinition: {
      bagelTitle: string;
      bagelQuote: string;
      bagelDescription: string;
      bagelImage: any;
    };
    bagelList: {
      bagelListTitle: string;
      bagelListDescription: string;
      bagelPriceTitle: string;
      bagelPriceDescription: string;
    };
  };
}> = ({ preview, navItems, homeData, allBagels }) => {
  useEffect(() => document.body.classList.remove('modal-open'));
  return (
    <Layout
      preview={preview}
      title={`${CMS_NAME} The Bagels `}
      desc={`${CMS_NAME} List of Bagels avaiable `}
    >
      <Header navItems={navItems} />
      <Container>
        {homeData?.bagelList && (
          <BagelList
            title={homeData.bagelList.bagelListTitle}
            desc={homeData.bagelList.bagelListDescription}
            priceTitle={homeData.bagelList.bagelPriceTitle}
            priceDesc={homeData.bagelList.bagelPriceDescription}
          />
        )}
        {allBagels && <BagelDetails bagels={allBagels} />}
      </Container>
    </Layout>
  );
};

export default Menu;

export async function getStaticProps({ preview = false }) {
  const { navItems } = await getNavItems(preview);
  const homeData = await getHomePageData();
  const allBagels = await getBagelsData(preview);
  return {
    props: {
      preview,
      homeData,
      allBagels,
      navItems,
    },
  };
}

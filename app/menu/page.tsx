import type { Metadata } from 'next';
import { getBagelsData, getHomePageData, getNavItems } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import BagelList from '../../components/BagelList';
import BagelDetails from '../../components/BagelDetails';
import RemoveModalOpenClass from '../../components/RemoveModalOpenClass';

export const revalidate = 10;

export const metadata: Metadata = {
  title: `${CMS_NAME} The Bagels `,
  description: `${CMS_NAME} List of Bagels avaiable `,
};

export default async function MenuPage() {
  const preview = false;
  const { navItems } = await getNavItems(preview);
  const homeData = await getHomePageData();
  const allBagels = await getBagelsData(preview);

  return (
    <>
      <RemoveModalOpenClass />
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
    </>
  );
}

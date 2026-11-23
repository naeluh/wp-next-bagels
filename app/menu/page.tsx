import type { Metadata } from 'next';
import BagelDetails from '../../components/BagelDetails';
import BagelList from '../../components/BagelList';
import Container from '../../components/Container';
import { getBagelsData, getHomePageData } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';

export const metadata: Metadata = {
  title: `${CMS_NAME} The Bagels`,
  description: `${CMS_NAME} List of Bagels avaiable`,
};

export default async function Menu() {
  const [{ bagelList }, allBagels] = await Promise.all([
    getHomePageData(),
    getBagelsData(),
  ]);

  return (
    <Container>
      {bagelList && (
        <BagelList
          title={bagelList.bagelListTitle}
          desc={bagelList.bagelListDescription}
          priceTitle={bagelList.bagelPriceTitle}
          priceDesc={bagelList.bagelPriceDescription}
        />
      )}
      {allBagels && <BagelDetails bagels={allBagels} />}
    </Container>
  );
}

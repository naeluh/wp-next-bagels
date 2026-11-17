import type { Metadata } from 'next';
import { getLocationsTimesData, getNavItems } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import LocationsTimes from '../../components/LocationsTimes';
import RemoveModalOpenClass from '../../components/RemoveModalOpenClass';

export const revalidate = 10;

export const metadata: Metadata = {
  title: `${CMS_NAME} Locations and Times `,
  description: `${CMS_NAME} Locations and Times to buy bagels `,
};

export default async function LocationTimesPage() {
  const preview = false;
  const { navItems } = await getNavItems(preview);
  const locationTimes = await getLocationsTimesData(preview);

  return (
    <>
      <RemoveModalOpenClass />
      <Header navItems={navItems} />
      <Container>
        {locationTimes && <LocationsTimes locations={locationTimes} />}
      </Container>
    </>
  );
}

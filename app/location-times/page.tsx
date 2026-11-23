import type { Metadata } from 'next';
import Container from '../../components/Container';
import LocationsTimes from '../../components/LocationsTimes';
import { getLocationsTimesData } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';

export const metadata: Metadata = {
  title: `${CMS_NAME} Locations and Times`,
  description: `${CMS_NAME} Locations and Times to buy bagels`,
};

export default async function LocationTimes() {
  const locationTimes = await getLocationsTimesData();
  return (
    <Container>
      <LocationsTimes locations={locationTimes ?? []} />
    </Container>
  );
}

import React, { FC } from 'react';
import { useEffect } from 'react';
import { getLocationsTimesData, getNavItems } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import LocationsTimes from '../../components/LocationsTimes';

const LocationTimes: FC<{
  preview?: boolean;
  locationTimes?: [];
  navItems?: [];
}> = ({ locationTimes, preview, navItems }) => {
  useEffect(() => document.body.classList.remove('modal-open'));
  return (
    <Layout
      preview={preview}
      title={`${CMS_NAME} Locations and Times `}
      desc={`${CMS_NAME} Locations and Times to buy bagels `}
    >
      <Header navItems={navItems} />
      <Container>
        {locationTimes && <LocationsTimes locations={locationTimes} />}
      </Container>
    </Layout>
  );
};

export default LocationTimes;

export async function getStaticProps({ preview = false }) {
  const { navItems } = await getNavItems(preview);
  const locationTimes = await getLocationsTimesData(preview);
  return {
    props: {
      preview,
      locationTimes,
      navItems,
    },
  };
}

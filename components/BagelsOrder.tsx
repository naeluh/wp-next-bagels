'use client';

import useSWR from 'swr';
import graphqlFetch from '../lib/graphqlFetch';
import { getDataQuery } from '../lib/queries';
import type { OrderData } from '../lib/types';
import AddGroups from './AddGroupsForm';
import Container from './Container';
import FullWidthHero from './FullWidthHero';
import LoadingScreen from './LoadingScreen';

export default function BagelsOrder() {
  const { data, error } = useSWR(getDataQuery, graphqlFetch<OrderData>);

  if (error) return <LoadingScreen error />;
  if (!data) return <LoadingScreen />;

  return (
    <>
      <FullWidthHero image={`/static/images/bagels.jpg`} />
      <Container>
        <AddGroups
          bagelData={data.allBagels.edges}
          pickupLocations={data.pickupLocations.edges}
          bagelChipsData={data.allBagelChips.edges}
          pricing={data.prices.edges}
        />
      </Container>
    </>
  );
}

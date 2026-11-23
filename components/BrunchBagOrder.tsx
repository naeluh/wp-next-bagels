'use client';

import useSWR from 'swr';
import graphqlFetch from '../lib/graphqlFetch';
import { getDataQuery } from '../lib/queries';
import type { BlackOutDate, BookedDay, OrderData } from '../lib/types';
import AddBrunchBag from './AddBrunchBag';
import Container from './Container';
import FullWidthHero from './FullWidthHero';
import LoadingScreen from './LoadingScreen';

const fetchJSON = async (url: string): Promise<BookedDay[]> =>
  (await fetch(url)).json();

export default function BrunchBagOrder({
  bbDates,
}: {
  bbDates: BlackOutDate[];
}) {
  const { data, error } = useSWR(getDataQuery, graphqlFetch<OrderData>);
  const bags = useSWR('/api/bags', fetchJSON);

  if (error && bags.error) return <LoadingScreen error />;
  if (!data) return <LoadingScreen />;

  return (
    <>
      <FullWidthHero image={`/static/images/brunch-bag.jpg`} />
      <Container classes='container mx-auto px-5 mb-24 lg:mb-20 flex-1 flex flex-col'>
        <AddBrunchBag
          bagelData={data.allBagels.edges}
          pricing={data.prices.edges}
          brunchBag={bags.data}
          brunchBagBlackOutDates={bbDates}
        />
      </Container>
    </>
  );
}

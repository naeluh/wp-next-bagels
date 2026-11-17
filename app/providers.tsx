'use client';

import { StateMachineProvider, createStore } from 'little-state-machine';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import * as ga from '../lib/ga';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function log(store: any) {
  return store;
}

createStore(
  {
    data: {
      bagelSelections: [],
      bagelChips: {},
      bagelChipData: [],
      location: '',
      time: '',
      totalCost: 0.0,
      formattedDate: '',
      formattedLocation: '',
      brunchBagData: [],
      brunchBag: {
        bags: [],
        deliveryDate: null,
        address: {
          addressOne: null,
          addressTwo: null,
          city: null,
          state: null,
          zip: null,
        },
      },
    },
  } as unknown as Parameters<typeof createStore>[0],
  {
    middleWares: [log],
  }
);

function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    ga.pageview(url);
  }, [pathname, searchParams]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StateMachineProvider>
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
      {children}
    </StateMachineProvider>
  );
}

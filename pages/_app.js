import '../styles/index.css';
import { StateMachineProvider, createStore } from 'little-state-machine';
import * as ga from '../lib/ga';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function log(store) {
  /* console.log(store); */
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
  },
  {
    middleWares: [log], // function to invoke each action
  }
);

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = url => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <StateMachineProvider>
      <Component {...pageProps} />
    </StateMachineProvider>
  );
};

export default App;

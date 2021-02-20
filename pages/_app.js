import '../styles/index.css';
import { StateMachineProvider, createStore } from 'little-state-machine';

function log(store) {
  // console.log(store);
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
    },
  },
  {
    middleWares: [log], // function to invoke each action
  }
);

const App = ({ Component, pageProps }) => {
  return (
    <StateMachineProvider>
      <Component {...pageProps} />
    </StateMachineProvider>
  );
};

export default App;

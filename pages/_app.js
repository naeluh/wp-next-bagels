import '../styles/index.css';
import { StateMachineProvider, createStore } from 'little-state-machine';

createStore({
  data: {},
});

const App = ({ Component, pageProps }) => {
  return (
    <StateMachineProvider>
      <Component {...pageProps} />
    </StateMachineProvider>
  );
};

export default App;

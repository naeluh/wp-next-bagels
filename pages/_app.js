import '../styles/index.css';
import { StateMachineProvider, createStore } from 'little-state-machine';

createStore({
  data: {},
});

function MyApp({ Component, pageProps }) {
  return (
    <StateMachineProvider>
      <Component {...pageProps} />
    </StateMachineProvider>
  );
}

export default MyApp;

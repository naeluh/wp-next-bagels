import type { GlobalState } from 'little-state-machine';
import './store'; // every useStateMachine consumer imports this file, so the store exists first

const updateAction = (
  state: GlobalState,
  payload: Partial<GlobalState['data']>
): GlobalState => ({
  ...state,
  data: {
    ...state.data,
    ...payload,
  },
});

export default updateAction;

const updateAction = (state, payload) => {
  return {
    ...state,
    data: {
      ...state.data,
      ...payload,
    },
  };
};

export default updateAction;

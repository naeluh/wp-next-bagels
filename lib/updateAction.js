const updateAction = (state, payload) => {
  console.log(state, payload);
  return {
    ...state,
    data: {
      ...state.data,
      ...payload,
    },
  };
};

export default updateAction;

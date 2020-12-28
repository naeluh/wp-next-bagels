const updateAction = (state, payload) => {
  console.log(state, payload);
  return {
    ...state,
    data: {
      ...state.data,
      ...state.data.bagelSelections,
      ...payload,
    },
  };
};

export default updateAction;

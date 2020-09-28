const INITIAL_STATE = {
  selected: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CAT_SELECT":
      return {
        selected: action.payload,
      };
    default:
      return state;
  }
};

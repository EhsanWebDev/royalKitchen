const INITIAL_STATE = {
  selected: {
    id: null,
  },
  position: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CAT_SELECT":
      return {
        ...state,
        selected: action.payload,
      };
    case "CAT_POS":
      return {
        ...state,
        position: action.payload,
      };
    default:
      return state;
  }
};

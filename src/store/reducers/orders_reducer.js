export default (state = { orders: null }, action) => {
  switch (action.type) {
    case "ALL_CURRENT_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

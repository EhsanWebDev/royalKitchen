const initial_state = {
  defaultAddress: null,
};

export default function(state = initial_state, action) {
  switch (action.type) {
    case 'ADD_ADDRESS':
      return {
        ...state,
        address: [action.payload, ...state.address],
      };
    case 'ALL_ADDRESS':
      return {
        ...state,
        address: action.payload || false,
      };

    case 'DEFAULT_ADDRESS': {
      return {
        ...state,
        defaultAddress: [action.payload || false],
      };
    }
    case 'DELETE_ADDRESS': {
      return {
        address: state.address.filter(
          address => address.ID !== action.payload.ID,
        ),
      };
    }
    case 'ERROR_ADDRESS':
      return {
        ...state,
        error: action.e,
      };
    default:
      return state;
  }
}

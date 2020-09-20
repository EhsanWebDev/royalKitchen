import { actionTypes } from "../actions/types";
const { LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS } = actionTypes;
const INITIAL_STATE = {
  user: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        user: action.user,
        isLoading: false,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        isLoading: false,
        error: action.error,
        user: null,
      };
    case "RETRIEVE_TOKEN":
      return {
        user: action.user,
      };

    case "SIGN_OUT":
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

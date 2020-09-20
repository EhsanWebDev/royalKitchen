import {actionTypes} from '../actions/types';
const {CATEGORY_FAIL, CATEGORY_LOADING, CATEGORY_SUCCESS} = actionTypes;

const INITIAL_STATE = {
  categories: null,
  error: null,
  subCategories: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CATEGORY_LOADING:
      return {
        isLoading: true,
      };
    case CATEGORY_SUCCESS:
      return {
        categories: action.categories,
        isLoading: false,
        error: null,
      };
    case CATEGORY_FAIL:
      return {
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

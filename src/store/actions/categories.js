import axios from 'axios';
import {CATEGORIES_URL} from '../../helpers/constants';
import {actionTypes} from './types';

export const getAllCategories = () => {
  return async dispatch => {
    dispatch({
      type: actionTypes.CATEGORY_LOADING,
    });

    const response = await axios.get(CATEGORIES_URL);

    if (response.data.status) {
      dispatch({
        type: actionTypes.CATEGORY_SUCCESS,
        categories: response.data.source,
      });
      return response;
    } else {
      dispatch({
        type: actionTypes.CATEGORY_FAIL,
        error: response.data,
      });
      return response;
    }
  };
};

import {actionTypes} from './types';
import axios from 'axios';
import {LOGIN_URL, SIGNUP_URL} from '../../helpers/constants';
import AsyncStorage from '@react-native-community/async-storage';

const {LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS} = actionTypes;

export function loginUser(payload) {
  return async dispatch => {
    const {phone, password} = payload;

    // dispatch({
    //   type: LOGIN_LOADING,
    // });

    const response = await axios.post(LOGIN_URL, {
      phone,
      password,
    });
    //   console.log('Auth_Res ->', response);

    if (response.data.status) {
      dispatch({
        type: LOGIN_SUCCESS,
        user: response.data.source,
      });
      try {
        console.log('saving');
        await AsyncStorage.setItem(
          'userToken',
          JSON.stringify(response.data.source),
        );
      } catch (e) {
        console.log('error in signing in', e);
      }
      return response;
    } else {
      dispatch({
        type: LOGIN_FAIL,
        error: response.data,
      });
      return response;
    }
  };
}
export function SIGNOUT() {
  return async dispatch => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
      console.log(e);
    }
    dispatch({
      type: 'SIGN_OUT',
    });
  };
}
export function createUser(payload) {
  return async dispatch => {
    const response = await axios.post(SIGNUP_URL, {
      ...payload,
    });
    //   console.log('Auth_Res ->', response);

    if (!response.data.status) {
      dispatch({
        type: LOGIN_FAIL,
        error: response.data,
      });
      return response;
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        user: response.data.source,
      });
      try {
        await AsyncStorage.setItem(
          'userToken',
          JSON.stringify(response.data.source),
        );
      } catch (e) {
        console.log('error in signing up', e);
      }
      return response;
    }
  };
}

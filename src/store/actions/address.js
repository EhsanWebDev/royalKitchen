import Axios from 'axios';

export function allAddress(id) {
  return async dispatch => {
    const res = await Axios.post(
      'https://gradhatcreators.com/api/user/address',
      {
        uid: id,
      },
    );
    if (res.data.status) {
      dispatch({
        type: 'ALL_ADDRESS',
        payload: res.data.source,
      });
      return res;
    } else {
      dispatch({
        type: 'ERROR_ADDRESS',
        e: res.data,
      });
      return res;
    }
  };
}
export function addAddress(data) {
  return {
    type: 'ADD_ADDRESS',
    payload: data,
  };
}
export function thisAddress(data) {
  return {
    type: 'DEFAULT_ADDRESS',
    payload: data,
  };
}

import {combineReducers} from 'redux';
import cart from './cart_reducer';
import auth from './auth_reducer';
import category from './category_reducer';
import address from './address_reducer';
export default combineReducers({
  cart,
  auth,
  category,
  address,
});

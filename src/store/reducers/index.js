import { combineReducers } from "redux";
import cart from "./cart_reducer";
import auth from "./auth_reducer";
import category from "./category_reducer";
import address from "./address_reducer";
import orders from "./orders_reducer";
import selector from "./cat_Selector";
export default combineReducers({
  cart,
  auth,
  category,
  address,
  orders,
  selector,
});

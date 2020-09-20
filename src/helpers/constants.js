export const BASE_URL = 'http://gradhatcreators.com/api/';

// *? Auth Urls
export const LOGIN_URL = `${BASE_URL}user/login`;
export const SIGNUP_URL = `${BASE_URL}user/signup`;

// *? Category Urls
export const CATEGORIES_URL = `${BASE_URL}user/categories`;

// * Random generated token
export function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * action return all role by RID
 */
export const GET_LOGIN_START = "GET_LOGIN_START";
export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_LOGIN_ERROR = "GET_LOGIN_ERROR";

export function getRoleLogin(filters, token) {
  return ({ type: GET_LOGIN_START,  payload: {filters, token} });
}

/**
 * action return all station
 */
export const GET_CENTERSLIST_START = "GET_CENTERSLIST_START";
export const GET_CENTERSLIST_SUCCESS = "GET_CENTERSLIST_SUCCESS";
export const GET_CENTERSLIST_ERROR = "GET_CENTERSLIST_ERROR";

export function getCentersList(clientId, token) {
  return ({ type: GET_CENTERSLIST_START, payload: {clientId, token} });
}

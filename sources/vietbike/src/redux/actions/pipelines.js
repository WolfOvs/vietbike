/**
 * action return all station
 */
export const GET_PIPELINESLIST_START = "GET_PIPELINESLIST_START";
export const GET_PIPELINESLIST_SUCCESS = "GET_PIPELINESLIST_SUCCESS";
export const GET_PIPELINESLIST_ERROR = "GET_PIPELINESLIST_ERROR";

export function getPipelinesList(clientId, token) {
  return ({ type: GET_PIPELINESLIST_START, payload: {clientId, token} });
}

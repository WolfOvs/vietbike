export const GET_LIMITI_START = "GET_LIMITI_START";
export const GET_LIMITI_SUCCESS = "GET_LIMITI_SUCCESS";
export const GET_LIMITI_ERROR = "GET_LIMITI_ERROR";

export function getSetLimiti(limitInfo) {
  return ({ type: GET_LIMITI_START,  payload: {limitInfo} });
}

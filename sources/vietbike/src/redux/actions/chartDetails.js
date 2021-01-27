export const GET_CHARTDETAILS_START = "GET_CHARTDETAILS_START";
export const GET_CHARTDETAILS_SUCCESS = "GET_CHARTDETAILS_SUCCESS";
export const GET_CHARTDETAILS_ERROR = "GET_CHARTDETAILS_ERROR";

export function getChartDetails(options) {
  return ({ type: GET_CHARTDETAILS_START,  payload: {options} });
}

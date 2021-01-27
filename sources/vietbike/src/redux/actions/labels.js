/**
 * action return all station
 */
export const GET_LABELS_START = "GET_LABELS_START";
export const GET_LABELS_SUCCESS = "GET_LABELS_SUCCESS";
export const GET_LABELS_ERROR = "GET_LABELS_ERROR";

export function getLabels(filters) {
  return ({ type: GET_LABELS_START, payload: { filters } });
}

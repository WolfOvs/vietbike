/**
 * action for show notifications users
 */
export const SHOW_LAYERNOTIFICATIONS_START = "SHOW_LAYERNOTIFICATIONS_START";
export const SHOW_LAYERNOTIFICATIONS_SUCCESS = "SHOW_LAYERNOTIFICATIONS_SUCCESS";
export const SHOW_LAYERNOTIFICATIONS_ERROR = "SHOW_LAYERNOTIFICATIONS_ERROR";


export function showNotifications() {
  return ({ type: SHOW_LAYERNOTIFICATIONS_START });
}

/**
 * action for reset notifications users
 */
export const RESET_LAYERNOTIFICATIONS_START = "RESET_LAYERNOTIFICATIONS_START";
export const RESET_LAYERNOTIFICATIONS_SUCCESS = "RESET_LAYERNOTIFICATIONS_SUCCESS";
export const RESET_LAYERNOTIFICATIONS_ERROR = "RESET_LAYERNOTIFICATIONS_ERROR";

export function resetNotifications() {
  return ({ type: RESET_LAYERNOTIFICATIONS_START });
}

/**
 * action for intercept service error
 */
export const GET_SERVICE_ERROR = "GET_SERVICE_ERROR";

export function serviceError() {
  return ({ type: GET_SERVICE_ERROR });
}
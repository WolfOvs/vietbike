/**
 * Action connect config endpoint SNAM
 */
export const GET_CONFIGFILE_START = "GET_CONFIGFILE_START";
export const GET_CONFIGFILE_ERROR = "GET_CONFIGFILE_ERROR";
export const GET_CONFIGFILE_SUCCESS = "GET_CONFIGFILE_SUCCESS";

export function getConfigFile() {
  return ({ type: GET_CONFIGFILE_START });
}

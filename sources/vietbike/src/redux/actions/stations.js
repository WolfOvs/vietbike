/**
 * action return all station
 */
export const GET_STATIONSLIST_START = "GET_STATIONSLIST_START";
export const GET_STATIONSLIST_SUCCESS = "GET_STATIONSLIST_SUCCESS";
export const GET_STATIONSLIST_ERROR = "GET_STATIONSLIST_ERROR";

export function getStationsList(clientId, token) {
  return ({ type: GET_STATIONSLIST_START, payload: {clientId, token} });
}

/**
 * acrion for apdate data station
 */
export const UPDATE_STATION_DATA = "UPDATE_STATION_DATA";

/**
 * check that the data arrives
 */
export const CHECK_OLD_DATA = "CHECK_OLD_DATA";

export function checkOldData(stationId, tcsId) {
  return ({ type: CHECK_OLD_DATA, payload: {stationId, tcsId} });
}

/**
 * check that the data arrives
 */
export const CHECK_OLD_DATA_STATIONS = "CHECK_OLD_DATA_STATIONS";

export function checkOldDataStations() {
  return ({ type: CHECK_OLD_DATA_STATIONS});
}
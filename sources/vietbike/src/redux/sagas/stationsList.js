import { takeLatest, call, put } from 'redux-saga/effects';

import stationsService from '../../services/stationsList';
import {
  GET_STATIONSLIST_START,
  GET_STATIONSLIST_SUCCESS,
  GET_STATIONSLIST_ERROR,
	// MQTT_CONNECTION_START,
} from '../actions/stations';

import {
  GET_SERVICE_ERROR
} from '../actions/notificationLayer';

/**
 * Return all station
 * @param {*} action 
 */
function* fetchStations(action) {
  try {
    const data = yield call(() => stationsService.getStationsList({token: action.payload.token}));
    yield put({ type: GET_STATIONSLIST_SUCCESS, stations:data });
  } catch (error) {
		console.error('error', error);
    yield put({ type: GET_SERVICE_ERROR, error: 'Errore' });
    yield put({ type: GET_STATIONSLIST_ERROR, error: 'Errore' });
  }
}

function* getStationsListWatcher() {
  yield takeLatest(GET_STATIONSLIST_START, fetchStations);
}

// imported in index saga
export default [ 
	getStationsListWatcher()
];

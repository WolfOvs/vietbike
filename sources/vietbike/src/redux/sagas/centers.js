import { takeLatest, call, put } from 'redux-saga/effects';

import centersService from '../../services/centers';
import {
  GET_CENTERSLIST_START,
  GET_CENTERSLIST_SUCCESS,
  GET_CENTERSLIST_ERROR,
	// MQTT_CONNECTION_START,
} from '../actions/centers';

import {
  GET_SERVICE_ERROR
} from '../actions/notificationLayer';

/**
 * Return all centers
 * @param {*} action 
 */
function* fetchCenters(action) {
  try {
    const data = yield call(() => centersService.getCentersList({token: action.payload.token}));
    yield put({ type: GET_CENTERSLIST_SUCCESS, centers:data });
  } catch (error) {
		console.error('error', error);
    yield put({ type: GET_SERVICE_ERROR, error: 'Errore' });
    yield put({ type: GET_CENTERSLIST_ERROR, error: 'Errore' });
  }
}

function* getCentersListWatcher() {
  yield takeLatest(GET_CENTERSLIST_START, fetchCenters);
}

// imported in index saga
export default [ 
	getCentersListWatcher()
];

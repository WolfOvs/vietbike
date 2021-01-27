import { takeLatest, call, put } from 'redux-saga/effects';
import limiti from '../../services/limiti';

import {
	GET_LIMITI_START,
	GET_LIMITI_SUCCESS,
	GET_LIMITI_ERROR,
} from '../actions/limiti';

import {
  GET_SERVICE_ERROR
} from '../actions/notificationLayer';

/**
 * Return all thresholds by station and by TCS
 * @param {*} action 
 */
function* fetchLimiti(action) {
  try {
    const data = yield call(() => limiti.getSetLimiti(action.payload.limitInfo));
    yield put({ type: GET_LIMITI_SUCCESS, payload: {setLimiti: data} 
    });
  } catch (error) {
		console.error('error', error);
    yield put({ type: GET_SERVICE_ERROR, error: 'Errore' });
    yield put({ type: GET_LIMITI_ERROR, error: 'Errore' });
  }
}

function* getLimitiWatcher() {
  yield takeLatest(GET_LIMITI_START, fetchLimiti);
}

// imported in index saga
export default [ 
	getLimitiWatcher()
];
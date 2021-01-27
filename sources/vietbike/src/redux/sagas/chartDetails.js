import { takeLatest, call, put } from 'redux-saga/effects';
import chartDetails from '../../services/chartDetails';

import {
	GET_CHARTDETAILS_START,
	GET_CHARTDETAILS_SUCCESS,
	GET_CHARTDETAILS_ERROR,
} from '../actions/chartDetails';

import {
  GET_SERVICE_ERROR
} from '../actions/notificationLayer';

/**
 * Return all thresholds by station and by TCS
 * @param {*} action 
 */
function* fetchChartDetails(action) {
  try {
    const data = yield call(() => chartDetails.getChartDetails(action.payload.options));
    yield put({ type: GET_CHARTDETAILS_SUCCESS, payload: {chartData: data} 
    });
  } catch (error) {
		console.error('error', error);
    yield put({ type: GET_SERVICE_ERROR, error: 'Errore' });
    yield put({ type: GET_CHARTDETAILS_ERROR, error: 'Errore' });
  }
}

function* getChartDetailsWatcher() {
  yield takeLatest(GET_CHARTDETAILS_START, fetchChartDetails);
}

// imported in index saga
export default [ 
	getChartDetailsWatcher()
];
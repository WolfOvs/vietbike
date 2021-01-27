import { takeLatest, call, put } from 'redux-saga/effects';

import labelsService from '../../services/labels';
import {
  GET_LABELS_START,
  GET_LABELS_SUCCESS,
  GET_LABELS_ERROR,
} from '../actions/labels';

import {
  GET_SERVICE_ERROR
} from '../actions/notificationLayer';

/**
 * Return all Labels
 * @param {*} action 
 */
function* fetchLabels(action) {
  try {
		const data = yield call(() => labelsService.getLabels(action.payload.filters));
    yield put({ type: GET_LABELS_SUCCESS, labels: data, filters: action.payload.filters });
  } catch (error) {
		console.error('error', error);
    yield put({ type: GET_SERVICE_ERROR, error: 'Errore' });
    yield put({ type: GET_LABELS_ERROR, error: 'Errore' });
  }
}

function* getLabelsWatcher() {
  yield takeLatest(GET_LABELS_START, fetchLabels);
}

// imported in index saga
export default [ 
	getLabelsWatcher()
];

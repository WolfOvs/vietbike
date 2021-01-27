import { takeLatest, call, put } from 'redux-saga/effects';

import pipelinesService from '../../services/pipelines';
import {
  GET_PIPELINESLIST_START,
  GET_PIPELINESLIST_SUCCESS,
  GET_PIPELINESLIST_ERROR,
	// MQTT_CONNECTION_START,
} from '../actions/pipelines';

import {
  GET_SERVICE_ERROR
} from '../actions/notificationLayer';

/**
 * Return all pipelines
 * @param {*} action 
 */
function* fetchPipelines(action) {
  try {
    const data = yield call(() => pipelinesService.getPipelinesList({token: action.payload.token}));
    yield put({ type: GET_PIPELINESLIST_SUCCESS, pipelines:data });
  } catch (error) {
		console.error('error', error);
    yield put({ type: GET_SERVICE_ERROR, error: 'Errore' });
    yield put({ type: GET_PIPELINESLIST_ERROR, error: 'Errore' });
  }
}

function* getPipelinesListWatcher() {
  yield takeLatest(GET_PIPELINESLIST_START, fetchPipelines);
}

// imported in index saga
export default [ 
	getPipelinesListWatcher()
];

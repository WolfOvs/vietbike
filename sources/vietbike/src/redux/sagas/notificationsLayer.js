import { takeLatest, put } from 'redux-saga/effects';

import {
	SHOW_LAYERNOTIFICATIONS_START,
	SHOW_LAYERNOTIFICATIONS_SUCCESS,
	SHOW_LAYERNOTIFICATIONS_ERROR,

	RESET_LAYERNOTIFICATIONS_START,
	RESET_LAYERNOTIFICATIONS_SUCCESS,
	RESET_LAYERNOTIFICATIONS_ERROR,
} from '../actions/notificationLayer';


/**
 * Show notifications
 * @param {*} action 
 */
function* fetchShowLayer(action) {
	try {
		yield put({ type: SHOW_LAYERNOTIFICATIONS_SUCCESS, payload: action.response });
	} catch (error) {
		console.error('error', error);
		yield put({ type: SHOW_LAYERNOTIFICATIONS_ERROR, error: 'Errore' });
	}
}

function* showLayerWatcher() {
	yield takeLatest(SHOW_LAYERNOTIFICATIONS_START, fetchShowLayer);
}

/**
 * Reset notifications
 * @param {*} action 
 */
function* fetchResetNotifications(action) {
	try {
		yield put({ type: RESET_LAYERNOTIFICATIONS_SUCCESS });
	} catch (error) {
		console.error('error', error);
		yield put({ type: RESET_LAYERNOTIFICATIONS_ERROR, error: 'Errore' });
	}
}

function* resetNotificationsWatcher() {
	yield takeLatest(RESET_LAYERNOTIFICATIONS_START, fetchResetNotifications);
}


// imported in index saga
export default [
	showLayerWatcher(),
	resetNotificationsWatcher()
];

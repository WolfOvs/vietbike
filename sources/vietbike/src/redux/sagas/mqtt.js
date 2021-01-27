import { takeLatest, put } from 'redux-saga/effects';

import {
	MQTT_UPDATECONNECTION_SUCCESS,
	MQTT_UPDATECONNECTION_START,
	MQTT_CONNECTION_ERROR,

	MQTT_DISCONNECT_START,
	MQTT_DISCONNECT_SUCCESS,
	MQTT_DISCONNECT_ERROR
} from '../actions/mqtt';
import { disconnectMqtt } from '../../services/mqttConnection';

/**
 * Return update data station
 * @param {*} action 
 */
function* fetchConnectionMqtt(action) {
	try {
		yield put({ type: MQTT_UPDATECONNECTION_SUCCESS, payload: action.payload });
	} catch (error) {
		console.error('error', error);
		yield put({ type: MQTT_CONNECTION_ERROR, error: 'Errore' });
	}
}

function* getConnectionMQTT() {
	yield takeLatest(MQTT_UPDATECONNECTION_START, fetchConnectionMqtt);
}

function* fetchDisconnectionMqtt(action) {
	try {
		disconnectMqtt();
		yield put({ type: MQTT_DISCONNECT_SUCCESS, action });
	} catch (error) {
		console.error('error', error);
		yield put({ type: MQTT_DISCONNECT_ERROR, error: 'Errore' });
	}
}

function* getDisconnectionMQTT() {
	yield takeLatest(MQTT_DISCONNECT_START, fetchDisconnectionMqtt);
}


// imported in index saga
export default [
	getConnectionMQTT(),
	getDisconnectionMQTT()
];
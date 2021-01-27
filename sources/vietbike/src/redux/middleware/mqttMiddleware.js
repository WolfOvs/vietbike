import { MQTT_CONNECTION_START, MQTT_UPDATECONNECTION_START, MQTT_CONNECTION_DIGITAL_START } from "../actions/mqtt";
import { UPDATE_STATION_DATA } from '../actions/stations';
import { ChangeTopikMqtt } from '../../services/mqttConnection';
import { MQTTconnect } from '../../services/mqttConnectionDigital';

const onMessageArrived = (message, store, isDigitalState = false) => {
	const payload = JSON.parse(`${message.payloadString}`);
	store.dispatch({ type: UPDATE_STATION_DATA, payload, isDigitalState });
}

const MQTTReduxMiddleware = store => next => action => {
	switch (action.type) {
		case MQTT_CONNECTION_START:
			ChangeTopikMqtt((message) => onMessageArrived(message, store), action.payload.clientID, action.payload.stationID, store.getState().mqtt.keyTopik);
			store.dispatch({ type: MQTT_UPDATECONNECTION_START, payload: action.payload });
			return next(action);
		case MQTT_CONNECTION_DIGITAL_START:
			MQTTconnect((message) => onMessageArrived(message, store, true), action.payload.clientID, action.payload.stationID);
			return next(action);
		default:
			return next(action);
	}
};

export default MQTTReduxMiddleware;





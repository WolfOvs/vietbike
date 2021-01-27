/**
 * Action connect MQTT SNAM
 */
export const MQTT_CONNECTION_START = "MQTT_CONNECTION_START";
export const MQTT_CONNECTION_ERROR = "MQTT_CONNECTION_ERROR";

export const MQTT_CONNECTION_DIGITAL_START = "MQTT_CONNECTION_DIGITAL_START";
export const MQTT_CONNECTION_DIGITAL_ERROR = "MQTT_CONNECTION_DIGITAL_ERROR";

export const MQTT_DISCONNECT_START = "MQTT_DISCONNECT_START";
export const MQTT_DISCONNECT_SUCCESS = "MQTT_DISCONNECT_SUCCESS";
export const MQTT_DISCONNECT_ERROR = "MQTT_DISCONNECT_ERROR";

export const MQTT_UPDATECONNECTION_START = "MQTT_UPDATECONNECTION_START";
export const MQTT_UPDATECONNECTION_SUCCESS = "MQTT_UPDATECONNECTION_SUCCESS";

export function mqttConnectionTopik(clientID, stationID) {
  return ({ type: MQTT_CONNECTION_START, payload: {clientID, stationID} });
}

export function mqttConnectionDigitalTopik(clientID, stationID) {
  return ({ type: MQTT_CONNECTION_DIGITAL_START, payload: {clientID, stationID} });
}

export function mqttDisconnectTopik(clientID, stationID) {
  return ({ type: MQTT_DISCONNECT_START, payload: {clientID, stationID} });
}
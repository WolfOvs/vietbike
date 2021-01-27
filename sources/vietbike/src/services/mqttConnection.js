import config from '../config/api-config';

const getClientIdRandom = (clientId) => {
	return clientId + Date.now();
}

let MQTT = null;

const MQTTconnect = (onMessageArrived, clientId, keyTopik) => {
	const endpoints = config.endpoints();
	MQTT = new window.Paho.MQTT.Client(endpoints.urlMqtt, endpoints.portMqtt, getClientIdRandom(clientId));
	const options = {
		useSSL: true,
		timeout: 3,
		userName: endpoints.userMqtt,
		password: endpoints.passMqtt,
		hosts: [endpoints.urlMqtt],
		ports: [endpoints.portMqtt],
		onSuccess: () => endpoints.topick[keyTopik].forEach(topick => MQTT.subscribe(topick)),
		onFailure: () => MQTTconnect(onMessageArrived, clientId, keyTopik)
	};
	MQTT.onMessageArrived = onMessageArrived;
	MQTT.onConnectionLost = (responseObject) => onConnectionLost(responseObject, onMessageArrived, clientId, keyTopik);
	MQTT.connect(options); //connect
}

const ChangeTopikMqtt = (onMessageArrived, clientId, keyTopik, keyOldTopik) => {
	const endpoints = config.endpoints();
	console.info('keyTopik ' + keyTopik, endpoints.topick[keyTopik])
	if (MQTT && MQTT.isConnected()) {
		console.info('MQTT isConnected', MQTT.isConnected())
		endpoints.topick[keyOldTopik].forEach(topick => MQTT.unsubscribe(topick));
		endpoints.topick[keyTopik].forEach(topick => MQTT.subscribe(topick));
	} else {
		MQTTconnect(onMessageArrived, clientId, keyTopik)
	}
}

const onConnectionLost = (responseObject, onMessageArrived, clientId, keyTopik) => {
	console.info('reconnect', responseObject)
	if (responseObject.errorCode !== 0) {
		console.error(`onConnectionLost: ${responseObject.errorMessage}`);
		MQTTconnect(onMessageArrived, clientId, keyTopik);
	}
}

const disconnectMqtt = () => {
	if (MQTT) {
		console.info('disconnect MQTT')
		MQTT.disconnect();
	}
}

export {
	ChangeTopikMqtt,
	disconnectMqtt
};
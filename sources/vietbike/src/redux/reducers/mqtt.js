import produce from 'immer';
import {
	MQTT_UPDATECONNECTION_SUCCESS,
	MQTT_DISCONNECT_SUCCESS
} from '../actions/mqtt';

const initialState = {
	keyTopik: null
};

export default (state = initialState, action) => (

	produce(state, draft => {
		switch (action.type) {
			case MQTT_UPDATECONNECTION_SUCCESS:
				draft.keyTopik = action.payload.stationID;
				break;
			case MQTT_DISCONNECT_SUCCESS:
				draft.keyTopik = null;
				break;
			default:
				break;
		}
	})
)
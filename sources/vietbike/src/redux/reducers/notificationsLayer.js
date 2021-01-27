import produce from 'immer';
import {
	SHOW_LAYERNOTIFICATIONS_SUCCESS,
	RESET_LAYERNOTIFICATIONS_SUCCESS,
	GET_SERVICE_ERROR,
} from '../actions/notificationLayer';

const initialState = {
	show: false,
	status: null,
	message: '',
	serviceError: false
};


export default (state = initialState, action) => (

	produce(state, draft => {
		switch (action.type) {
			case SHOW_LAYERNOTIFICATIONS_SUCCESS:
				draft.show = true;
				draft.status = action.payload.status;
				draft.message = action.payload.message;
				break;
			case RESET_LAYERNOTIFICATIONS_SUCCESS:
				draft.show = false;
				draft.status = null;
				draft.message = '';
				break;
			case GET_SERVICE_ERROR:
				draft.serviceError = true;
				break;
			default:
				break;
		}
	})
)

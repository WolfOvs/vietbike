import produce from 'immer';
import {
	GET_LIMITI_SUCCESS,
	GET_LIMITI_ERROR
} from '../actions/limiti';

const initialState = {
	
	setLimiti: null
};

export default (state = initialState, action) => (
	produce(state, draft => {
		switch (action.type) {
			case GET_LIMITI_SUCCESS:
				const limit = action.payload.setLimiti;
				draft.setLimiti = limit.status;
				break;
			case GET_LIMITI_ERROR:
				draft.setLimiti = 'KO';
				break;
			default:
				break;
		}
	})
)
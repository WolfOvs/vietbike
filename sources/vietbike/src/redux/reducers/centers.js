import produce from 'immer';

import {
	GET_CENTERSLIST_SUCCESS,
} from '../actions/centers';

const initialState = {
	centers: null, // null for not loaded
};

export default (state = initialState, action) => (
	produce(state, draft => {
		switch (action.type) {
			case GET_CENTERSLIST_SUCCESS:
				const centers = action.centers;
				draft.centers = centers;
				break;
			default:
				break;
		}
	})
);
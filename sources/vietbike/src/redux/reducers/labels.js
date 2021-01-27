import produce from 'immer';
import {
	GET_LABELS_SUCCESS,
} from '../actions/labels';

const initialState = {
	labels: null
};

export default (state = initialState, action) => (
	produce(state, draft => {
		switch (action.type) {
			case GET_LABELS_SUCCESS:
				let newLabels = { ...draft.labels };
				if (newLabels[action.filters.station]) {
					newLabels[action.filters.station][action.filters.idTC] = action.labels;
				} else {
					newLabels[action.filters.station] = {};
					newLabels[action.filters.station][action.filters.idTC] = action.labels;
				}
				draft.labels = newLabels;
				break;
			default:
				break;
		}
	})
)
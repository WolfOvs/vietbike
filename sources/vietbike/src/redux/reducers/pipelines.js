import produce from 'immer';

import {
	GET_PIPELINESLIST_SUCCESS,
} from '../actions/pipelines';

const initialState = {
	pipelines: null, // null for not loaded
};

export default (state = initialState, action) => (
	produce(state, draft => {
		switch (action.type) {
			case GET_PIPELINESLIST_SUCCESS:
				const pipelines = action.pipelines;

				pipelines.forEach(element => {
					element.coordinates.longitudine = Number(element.coordinates.longitudine);
					element.coordinates.latitudine = Number(element.coordinates.latitudine);
					element.id = 1;
				});

				draft.pipelines = pipelines;
				break;
			default:
				break;
		}
	})
);
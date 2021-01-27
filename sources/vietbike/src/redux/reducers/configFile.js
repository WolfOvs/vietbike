import produce from 'immer';
import {
	GET_CONFIGFILE_SUCCESS
} from '../actions/configFile';

const initialState = {
	isConfigDataLoaded: false
};

export default (state = initialState, action) => (

	produce(state, draft => {
		switch (action.type) {
			case GET_CONFIGFILE_SUCCESS:
				draft.isConfigDataLoaded = action.data.isConfigDataLoaded;
				break;
			default:
				break;
		}
	})
)
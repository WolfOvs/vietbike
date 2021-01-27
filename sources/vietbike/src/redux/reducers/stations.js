import produce from 'immer';

import {
	GET_STATIONSLIST_SUCCESS,
	UPDATE_STATION_DATA,
	CHECK_OLD_DATA,
	CHECK_OLD_DATA_STATIONS
} from '../actions/stations';
import { mappingStationsByString, constants } from '../../utils';

const initialState = {
	stations: null, // null for not loaded
};

export default (state = initialState, action) => (
	produce(state, draft => {
		switch (action.type) {
			case GET_STATIONSLIST_SUCCESS:
				const stations = action.stations;
				draft.stations = stations;
				break;
			default:
				break;
		}
	})
);
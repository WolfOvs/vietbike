import produce from 'immer';
import {
	GET_LOGIN_SUCCESS
} from '../actions/login';

const initialState = {
	// ridp: null,
	// role: null,
	// token: null,
	status: null
};

export default (state = initialState, action) => (
	produce(state, draft => {
		switch (action.type) {
			case GET_LOGIN_SUCCESS:
				const user = action.payload.user.status;
				if(user === 'OK') {
					// draft.ridp = user.ridp;
					// draft.role = user.role;
					// draft.token = action.payload.token;
					draft.status = user;
				} else {
					// draft.ridp = null;
					draft.status = 'not avaliable';
					// draft.role = 'not avaliable';
					// draft.token = null;
				}
				break;
			default:
				break;
		}
	})
)
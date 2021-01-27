import { takeLatest, call, put } from 'redux-saga/effects';
import login from '../../services/login';

import {
	GET_LOGIN_START,
	GET_LOGIN_SUCCESS,
	GET_LOGIN_ERROR,
} from '../actions/login';

import {
  GET_SERVICE_ERROR
} from '../actions/notificationLayer';

/**
 * Return all thresholds by station and by TCS
 * @param {*} action 
 */
function* fetchRoleLogin(action) {
  try {
    const data = yield call(() => login.getLoginUserType(action.payload.filters, 
      {token: action.payload.token}
      ));
    yield put({ type: GET_LOGIN_SUCCESS, payload: {user: data, 
      token: action.payload.token
    } 
    });
  } catch (error) {
		console.error('error', error);
    yield put({ type: GET_SERVICE_ERROR, error: 'Errore' });
    yield put({ type: GET_LOGIN_ERROR, error: 'Errore' });
  }
}

function* getRoleLogintWatcher() {
  yield takeLatest(GET_LOGIN_START, fetchRoleLogin);
}

// imported in index saga
export default [ 
	getRoleLogintWatcher()
];
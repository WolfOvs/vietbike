import { all } from 'redux-saga/effects';
import stationsListSagas from './stationsList';
import configSaga from './configFile';
import login from './login';
import mqtt from './mqtt';
import labels from './labels';
import notifications from './notificationsLayer';
import centers from './centers';
import pipelines from './pipelines';
import limiti from './limiti';
import chartDetails from './chartDetails';

// imported in store
export default function* rootSaga() {
  yield all([
		...stationsListSagas,
		...configSaga, 
		...login,
		...mqtt,
		...labels,
		...notifications,
		...centers,
		...pipelines,
		...limiti,
		...chartDetails
	]);
}
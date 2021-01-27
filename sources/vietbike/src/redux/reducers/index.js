import { combineReducers } from 'redux';

import stationsList from './stations';
import centers from './centers';
import configFile from './configFile';
import user from './login';
import mqtt from './mqtt';
import labels from './labels';
import notifications from './notificationsLayer';
import pipelines from './pipelines';
import limiti from './limiti';
import chartDetails from './chartDetails'

export default combineReducers(
  {
		stationsList,
		configFile,
		user,
		mqtt,
		labels,
		notifications,
		centers,
		pipelines,
		limiti,
		chartDetails
  }
)
import { takeLatest, call, put } from 'redux-saga/effects';

import {
	GET_CONFIGFILE_START,
	GET_CONFIGFILE_ERROR,
	GET_CONFIGFILE_SUCCESS
} from '../actions/configFile';
import readFile from '../../services/files';
import { setEndpoints } from '../../config/api-config';

import {
	GET_SERVICE_ERROR
  } from '../actions/notificationLayer';

// const config = require('../../assets/config.json');

const config = {
	"endpoints":{
		"urlLogin":"https://snam-noprod-apimgmt.azure-api.net/intelligentdisp-t/intelligentdisp/access/login",
		"getLimiti":"https://snam-noprod-apimgmt.azure-api.net/intelligentdisp-t/intelligentdisp/dataaccess/mapLimitDashboard",
		"urlStationsList":"https://snam-noprod-apimgmt.azure-api.net/intelligentdisp-t/intelligentdisp/dataaccess/mapLimitDashboard",
		"urlCenters":"https://snam-noprod-apimgmt.azure-api.net/intelligentdisp-t/intelligentdisp/dataaccess/retrieveCenters",
		"urlPipelines":"https://snam-noprod-apimgmt.azure-api.net/intelligentdisp-t/intelligentdisp/dataaccess/retrievePipelines",
		"urlLimiti":"https://snam-noprod-apimgmt.azure-api.net/intelligentdisp-t/intelligentdisp/dataaccess/confermaLimite",
		"urlChartDetails":"https://snam-noprod-apimgmt.azure-api.net/intelligentdisp-t/intelligentdisp/dataaccess/dettaglioCheckGraph",
	},
	"sso-config":{
	   "realm":"ADFS-PROD-DIR-OIDC",
	   "url":"https://login.microsoftonline.com/19646c18-1578-452e-b5fb-8504eb919aaa/oauth2/v2.0/authorize",
	   "clientId":"097f3b0c",
	   "credentials":{
		  "secret":"83413c74fe708b0b7f3fc9ba0ff8c4bc"
	   }
	}
  }

/* SAGA */
function* getConfig() {
	try {
		let data;
		if (process.env.NODE_ENV === 'development') {
			data = JSON.stringify(config);
		} else {
			//data = yield call(() => readFile('/priv/config/config.json'));
			data = JSON.stringify(config);
		}
		setEndpoints(data);
		yield put({ type: GET_CONFIGFILE_SUCCESS, data: {isConfigDataLoaded: true} });
	} catch (error) {
		console.error('error', error);
		yield put({ type: GET_SERVICE_ERROR, error: 'Errore' });
		yield put({ type: GET_CONFIGFILE_ERROR });
	}
}
function* getConfigWatch() {
	yield takeLatest(GET_CONFIGFILE_START, getConfig);
}

export default [
	getConfigWatch()
];
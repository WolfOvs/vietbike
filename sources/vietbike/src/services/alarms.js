import config from '../config/api-config';
import {
	fetchResource,
	createQueryFilters
} from './api';

const alarms = {
	getAlarms(filters, options) {
		const url = `${config.endpoints().urlGetAlarmsAll}${createQueryFilters(filters)}`;
		return fetchResource(url, options)
			.then(res => res.result)
	},
	getAlarmsByDevice(filters, options) {
		const url = `${config.endpoints().urlGetAlarmsDevice}${createQueryFilters(filters)}`;
		return fetchResource(url, options)
			.then(res => res.result)
	}
};



/* Call rest api get list stations */
export default alarms;

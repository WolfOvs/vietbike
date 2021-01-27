import config from '../config/api-config';
import {
	fetchResource,
	createQueryFilters
} from './api';

const thresholds = {
	getThresholds(filters, options) {
		const url = `${config.endpoints().urlGetThresholds}${createQueryFilters(filters)}`;
		return fetchResource(url, options)
			.then(res => res.result)
	},
	editThresholds(filters, options) {
		const url = `${config.endpoints().urlEditThresholds}${createQueryFilters(filters)}`;
		return fetchResource(url, {method: 'POST', body: JSON.stringify(options.body)})
			.then(res => res)
	}
};

/* Call rest api get list stations */
export default thresholds;

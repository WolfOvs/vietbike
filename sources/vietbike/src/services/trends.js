import config from '../config/api-config';
import {
	fetchResource,
	createQueryFilters
} from './api';

const trendsService = {
	getDataTrend(filters, options) {
		const url = `${config.endpoints().getTrendsByTimeFrame}${createQueryFilters(filters)}`;
		return fetchResource(url, options)
			.then(res => res.result)
	},
	getCardsTrend(filters, options) {
		const url = `${config.endpoints().urlTrends}${createQueryFilters(filters)}`;
		return fetchResource(url, options)
			.then(res => res.result)
	},
	editCardTrend(filters, options) {
		const url = `${config.endpoints().editTrends}${createQueryFilters(filters)}`;
		return fetchResource(url, {token: options.token, method: 'POST', body: JSON.stringify(options.body)})
			.then(res => res)
	},
	deliteCardTrend(filters, options) {
		const url = `${config.endpoints().deleteTrends}${createQueryFilters(filters)}`;
		return fetchResource(url, {token: options.token, method: 'POST'})
			.then(res => res)
	},
	getCSV(filters, options) {
		const url = `${config.endpoints().getCSVTrends}${createQueryFilters(filters)}`;
		return fetchResource(url, options)
			.then(res => res)
	},
	createTrend(filters, options) {
		const url = `${config.endpoints().urlCreateTrend}${createQueryFilters(filters)}`;
		return fetchResource(url, {token: options.token, method: 'POST', body: JSON.stringify(options.body)})
			.then(res => res)
	}
};

/* Call rest api get list stations */
export default trendsService;

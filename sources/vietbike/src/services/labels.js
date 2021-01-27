import config from '../config/api-config';
import { fetchResource, createQueryFilters } from './api';

const labelsService = {
	getLabels(filters, options) {
    const url = `${config.endpoints().urlGetLabels}${createQueryFilters(filters)}`;
		return fetchResource(url, options)
			.then(res => res.result)
	},
};

/* Call rest api get list stations */
export default labelsService;

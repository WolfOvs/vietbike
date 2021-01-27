import config from '../config/api-config';
import { fetchResource, createQueryFilters } from './api';

const curvesService = {
	getCurves(filters, options) {
    const url = `${config.endpoints().urlGetCurves}${createQueryFilters(filters)}`;
		return fetchResource(url, options)
			.then(res => res.result)
	},
};

/* Call rest api get list stations */
export default curvesService;

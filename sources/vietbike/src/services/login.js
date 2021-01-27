import config from '../config/api-config';
import {
	fetchResource,
	createQueryFilters
} from './api';

const login = {
	getLoginUserType(filters, options) {
		const url = `${config.endpoints().urlLogin}`;
		return fetchResource(url, {method: 'POST', body: JSON.stringify(filters)})
			.then(res => res)
	}
};

/* Call rest api get list stations */
export default login;

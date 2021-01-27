import config from '../config/api-config';
import { fetchResource } from './api';

const centersService = {
	getCentersList(options) {
		const url = config.endpoints().urlCenters;
		   return fetchResource(url, {method: 'POST', body: JSON.stringify({})})
		   	.then(res => res.centers)
		   	.catch((error) => {
		   		console.error('Error:', error);
		   	  });
	},
};

/* Call rest api get list stations */
export default centersService;

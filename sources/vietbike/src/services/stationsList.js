import config from '../config/api-config';
import { fetchResource } from './api';

const stationsService = {
	getStationsList(options) {
		const url = config.endpoints().urlStationsList;
		    return fetchResource(url, {method: 'POST', body: JSON.stringify({})})
		    	.then(res => res.implants)
		    	.catch((error) => {
		    		console.error('Error:', error);
		    	  });
	},
};

/* Call rest api get list stations */
export default stationsService;

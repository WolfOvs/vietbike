import config from '../config/api-config';
import {
	fetchResource,
} from './api';

const limitiService = {
	getSetLimiti(limitInfo) {
        const url = config.endpoints().urlLimiti;

       // return { status: 'OK' }

		return fetchResource(url, {method: 'POST', body: JSON.stringify(limitInfo)})
            .then(res => res)
            .catch((error) => {
                console.error('Error:', error);
              });
	}
};

/* Call rest api get list stations */
export default limitiService;

class Error {
	constructor(statusCode = 0, message = '') {
		this.status = statusCode >= 200 && statusCode < 300 ? 'ok' : 'ko';
		this.statusCode = statusCode;
		this.message = message;
	}
}


const fetchResource = (url, options = { method: 'GET' }) => {
	const startRequest = () => {
		const token = localStorage.getItem('token');
		//Api Rest
		const config = {
			mode: "cors",
			method: options.method || 'GET',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			redirect: 'follow',
			referrer: 'no-referrer'
		};
		if (options.method === 'POST') {
			config.body = options.body;
		}
		// FETCH 
		return fetch(url, config)
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return Promise.resolve(response);
				} else {
					return Promise.reject(new Error(response.status));
				}
			})
			.then(response => {
				const contentType = response.headers.get('content-type');
				if (contentType && contentType.indexOf('text/csv') !== -1) {
					return response.blob().then(blob => {
						// let header = response.headers.get('content-disposition');
						// let filename = header
						// 	.match(/filename=("?)(.+)("?)$/)[2]
						// 	.replace('"', '');
						let filename = `${options.fileName || 'export'}.csv`;
						let elem = window.document.createElement('a');
						elem.href = window.URL.createObjectURL(blob);
						elem.download = filename;
						document.body.appendChild(elem);
						elem.click();
						document.body.removeChild(elem);
					});
				} else {
					if(options.method && options.method !== 'GET') {
						return response.json();
					}
					return response.json();
				}
			})
	};

	return startRequest();

	// if (window.keycloak.authenticated && !window.keycloak.isTokenExpired(30)) {
	// 	return startRequest();
	// } else {
	// 	window.keycloak.updateToken(600).success(refreshed => {
	// 		if (refreshed) {
	// 			console.info('Token refreshato con successo');
	// 			return startRequest();
	// 		} else {
	// 			console.info('Errore refresh token');
	// 		}
	// 	});
	// }
}

const createQueryFilters = (filters) => {
	let res = "?";
	if (!filters) filters = {};
	let keys = Object.keys(filters);
	let first = true;
	keys.forEach(key => {
		if (!first) res += '&';
		first = false;
		res += key;
		res += '=';
		res += filters[key];
	})
	return res;
}

export {
	fetchResource,
	createQueryFilters
};
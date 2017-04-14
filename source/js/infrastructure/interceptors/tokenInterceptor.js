//import q from 'q';

const xTokenKey = 'X-TOKEN';
const xRegistrationTokenKey = 'X-RegistrationToken';

export default {
	create({getToken, setToken}){

		return {request, response, responseError};

		function request(config) {
			const token = getToken();
			if (token) {
				config.headers[xTokenKey] = token;
			}
			return config;
		}

		function response(resp) {
			let token = resp.headers[xTokenKey] || resp.headers[xRegistrationTokenKey];
			if (token) {
				setToken(token);
			}
			return resp;
		}

		function responseError(resp) {
			if (resp.status == 401) {
				setToken(null);
			}
			return Promise.reject(resp);
		}
	}
}
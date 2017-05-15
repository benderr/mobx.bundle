import * as mapper from './accountMapper'
import api from 'infrastructure/api/api'

/**
 * Авторизация
 * @returns {*|axios.Promise}
 */
function profile(token) {
	return api.v1().profile().get({}, {Authorization: `Basic ${token}`})
		.then((response) => mapper.toClientLogin(response.data));
		//.catch(error => ({status: error.status, data: error.data}));
}

function logout() {
	return api.v1().logout().get();
}

function retailpoints() {
	return api.v1().retailpoints().get();
}

export {profile, retailpoints, logout}
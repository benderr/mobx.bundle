import * as mapper from './accountMapper'
import api from 'infrastructure/api/api'

/**
 * Авторизация
 * @returns {*|axios.Promise}
 */
function profile(token) {
	return api.v1().profile().get({}, {Authorization: `Basic ${token}`})
		.then((response) => mapper.toClientLogin(response.data));
}

export {profile}
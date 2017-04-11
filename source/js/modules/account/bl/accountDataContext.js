import * as mapper from './accountMapper'
import api from 'infrastructure/api/api'

/**
 * Авторизация
 * @param email
 * @param password
 * @returns {*|axios.Promise}
 */
function login(email, pass) {
	return api.auth().post({
		Password: pass,
		Email: email
	}).then((response) => mapper.toClientLogin(response.data));
}

export {login}
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

/**
 * Получение профиля
 * @returns {Promise.<{firstName, lastName}>|*|axios.Promise|Thenable<{firstName, lastName}>|Promise<{firstName, lastName}>}
 */
function loginInfo() {
	return api.account().logininfo()
		.get().then((response) => mapper.toClientLoginInfo(response.data));
}

export {profile, loginInfo}
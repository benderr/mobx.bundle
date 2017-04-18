import * as mapper from './accountMapper'
import api from 'infrastructure/api/api'

/**
 * Авторизация
 * @param email
 * @param pass
 * @returns {*|axios.Promise}
 */
function login(email, pass) {
	return api.auth().post({
		Password: pass,
		Email: email
	}).then((response) => mapper.toClientLogin(response.data));
}

/**
 * Получение профиля
 * @returns {Promise.<{firstName, lastName}>|*|axios.Promise|Thenable<{firstName, lastName}>|Promise<{firstName, lastName}>}
 */
function loginInfo() {
	return api.account().logininfo()
		.get().then((response) => mapper.toClientLoginInfo(response.data));
}

export {login, loginInfo}
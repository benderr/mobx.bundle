import * as mapper from './accountMapper'
import api from 'infrastructure/api/api'

/**
 * Авторизация
 * @returns {*|axios.Promise}
 */
export function profile(token) {
	return api.v1().profile().get({}, {Authorization: `Basic ${token}`})
		.then((response) => mapper.toClientLogin(response.data));
}

export function logout() {
	return api.v1().logout().get();
}

export const forgotPass = (email) => {
	return api.v1().user(email).tempPassword().post();
};

/**
 * Смена пароля
 * @param email
 * @returns {axios.Promise|*}
 */
export const changePass = (oldPassword, newPassword) => {
	const queryString = `currentPassword=${oldPassword}&newPassword=${newPassword}`;
	return api.v1().user().password().put({
		currentPassword: oldPassword,
		newPassword: newPassword
	}, {querystring: queryString});
};

/**
 * Регистрация
 */
export const register = (user) => {
	return api.v1().webUser().post({
		captcha: user.captcha,
		email: user.email,
		password: user.password,
		phone: user.phone,
		userCompanyName: user.company,
		userName: `${user.name} ${user.surname}`
	});
};

/**
 * Получает состояние о подключение сервиса "МойСклад"
 */
export const getStateIntegration = () => {
	return api.v1().user().moysklad().state().get()
		.then((response) => {
			return {
				msIntegrationEnabled: response.data.msIntegrationEnabled,
				msLogin: response.data.msLogin,
				msPassword: ''
			}
		});
};

/**
 * Запрос на проверку наличия пользователя в МойСклад или сохраняет данные на сервере
 * @param testing		- выполняется тестовый запрос или сохранение данных на сервере
 * @param msLogin		- логин в формате "admin@***"
 * @param msPassword	- пароль
 */
export const connectIntegration = (testing, msLogin, msPassword) => {
	const queryString = `checkOnly=${testing}&msLogin=${msLogin}&msPassword=${msPassword}`;
	return api.v1().user().moysklad().enable().put({
		checkOnly: testing,
		msLogin: msLogin,
		msPassword: msPassword
	}, {querystring: queryString});
};
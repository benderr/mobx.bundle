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
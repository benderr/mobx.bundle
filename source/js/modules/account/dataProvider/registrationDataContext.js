import api from 'infrastructure/api/api'

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


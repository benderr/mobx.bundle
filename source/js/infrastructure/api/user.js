export const compose = (api) => {
	/**
	 * авторизация/получение профиля
	 */
	api.v1().addResource('profile');

	api.v1().addResource('logout');

	/**
	 * регистрация
	 */
	api.v1().addResource('webUser', 'web-user');

	let user = api.v1().addResource('user');

	/**
	 * восстановление пароля
	 */
	user.addResource('tempPassword', 'temp-password');

	/**
	 * Изменение пароля
	 */
	user.addResource('password');
};

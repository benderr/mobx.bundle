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
};

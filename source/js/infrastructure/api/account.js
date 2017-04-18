export const compose = (api) => {

	api.addResource('account');

	/**
	 * Получение информации о профиле
	 */
	api.account().addResource('logininfo');
};

export default (api) => {
	/**
	 * авторизация
	 */
	api.v1().addResource('retailpoints', 'retail-points');
	api.v1().addResource('retailpoint', 'retail-point');
	api.fn().v1().addResource('retailpoint', 'retail-point');
};

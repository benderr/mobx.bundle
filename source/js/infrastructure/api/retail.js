export default (api) => {
	/**
	 * авторизация
	 */
	api.v1().addResource('retailpoints', 'retail-points');
	api.v1().addResource('retailpoint', 'retail-point');
	api.v1().retailpoint().addResource('catalog');
	api.v1().retailpoint().catalog().addResource('inventory','INVENTORY');
};

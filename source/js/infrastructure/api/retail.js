export default (api) => {
	/**
	 * авторизация
	 */
	let retailPoints = api.v1().addResource('retailpoints', 'retail-points');
	let catalog = retailPoints.addResource('catalog');
	catalog.addResource('inventory');
};

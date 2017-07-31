export default (api) => {
	api.fn().v1().retailpoint().addResource('docs');

	api.v1().retailpoint().addResource('downloadSalesReport');
};

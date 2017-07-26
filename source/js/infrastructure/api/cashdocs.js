export default (api) => {
	api.v1().retailpoint().addResource('cashdocs');
	const shift = api.v1().retailpoint().addResource('shift');
	shift.addResource('cashdoc');
};

export default (api) => {
	const docs=api.fn().v1().retailpoint().addResource('docs');
	docs.addResource('requeue','re-queue');
};

export default function getStores(modules) {
	return modules.filter((m) => isFunc(m.getStores))
		.reduce((stores, m) => {
			const moduleStores = m.getStores()
			return {...stores, ...moduleStores}
		}, {});
}


function isFunc(f) {
	return typeof f === 'function';
}
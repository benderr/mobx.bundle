import React from 'react';

export default function getRoutes(modules, store) {
	return modules.filter((m) => isFunc(m.getRoutes))
		.reduce((routes, module) => {
			const routesObject = module.getRoutes();
			const routesArray = Object.keys(routesObject).reduce((prev, key) => {
				const route = routesObject[key];
				return [...prev, {...route, name: key}]
			}, []);
			return [...routes, ...routesArray];
		}, []);
}

function isFunc(f) {
	return typeof f === 'function';
}
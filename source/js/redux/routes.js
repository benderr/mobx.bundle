import React from 'react';
import {makeHooksSafe} from './routeHooks'
//import {Route} from 'react-router';

// export function getRoutesDeclarative(modules) {
// 	return (
// 		<div>
// 			{modules.filter((m) => isFunc(m.getRoutes)).map((m) => m.getRoutes())}
// 		</div>
// 	);
// }

export default function getRoutes(modules, store) {
	let routes = modules.filter((m) => isFunc(m.getRoutes))
		.reduce((routes, module) => {
			let moduleRoutes = module.getRoutes();
			return [...routes, ...moduleRoutes];
		}, []);

	return makeHooksSafe(routes, store);

	// function setHooks(routes) {
	// 	routes.forEach(route => {
	// 		if (route.childRoutes && route.childRoutes.length > 0)
	// 			route.childRoutes = setHooks(route.childRoutes);
	// 		setHook(route);
	// 	});
	//
	// 	return routes;
	// }
	//
	// function setHook(route) {
	// 	return route;
	// }

	// function setIndexRoute(routes) {
	// 	const _indexRoute = routes.filter(s => s.path == '/')[0];
	// 	if (_indexRoute) {
	// 		if (indexRoute)
	// 			throw 'Может быть только один indexRoute';
	// 		indexRoute = setHook(_indexRoute);
	// 		return routes.filter(s => s.path != '/');
	// 	}
	// 	return routes;
	// }

	// if (!indexRoute)
	// 	throw 'Не задан indexRoute в формате';

	//return allRoutes;
}

function isFunc(f) {
	return typeof f === 'function';
}
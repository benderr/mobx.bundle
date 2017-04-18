import React from 'react';
import {makeHooksSafe} from './routeHooks'

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
}

function isFunc(f) {
	return typeof f === 'function';
}
import React from 'react';
import {Route} from 'react-router';
//import {createRoutes} from 'react-router/lib/RouteUtils';
const loginStatus = {};//TODO
import InternalLayout from 'components/InternalLayout'

export function getRoutesDeclarative(modules) {
	return (
		<div>
			{modules.filter((m) => isFunc(m.getRoutes)).map((m) => m.getRoutes())}
		</div>
	);
}

export default function getRoutes(modules) {
	let indexRoute;

	const childRoutes = modules.filter((m) => isFunc(m.getRoutes))
		.reduce((routes, module) => {
			//let moduleRoutes = setIndexRoute(module.getRoutes())
			let moduleRoutes = module.getRoutes();
			moduleRoutes = setHooks(moduleRoutes);

			return [...routes, ...moduleRoutes];
		}, []);

	function setHooks(routes) {
		routes.forEach(route => {
			if (route.childRoutes && route.childRoutes.length > 0)
				route.childRoutes = setHooks(route.childRoutes);
			setHook(route);
		});

		return routes;
	}

	function setHook(route) {
		return route;
	}

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

	const routes = childRoutes;

	console.log(routes);

	return routes;
}

function isFunc(f) {
	return typeof f === 'function';
}


// Wrap the hooks so they don't fire if they're called before
// the store is initialised. This only happens when doing the first
// client render of a route that has an onEnter hook
// function makeHooksSafe(routes, store) {
// 	if (Array.isArray(routes)) {
// 		return routes.map((route) => makeHooksSafe(route, store));
// 	}
//
// 	if (routes.loginRequired) {
// 		addLoginRequiredHook(routes, store)
// 	}
//
// 	if (routes.onlyAnonymous) {
// 		addOnlyAnonymousHook(routes, store)
// 	}
//
// 	const onEnter = routes.onEnter;
//
// 	if (onEnter) {
// 		routes.onEnter = function safeOnEnter(...args) {
// 			try {
// 				store.getState();
// 			} catch (err) {
// 				if (onEnter.length === 3) {
// 					args[2]();
// 				}
//
// 				// There's no store yet so ignore the hook
// 				return;
// 			}
//
// 			onEnter.apply(null, args);
// 		};
// 	}
//
// 	if (routes.childRoutes) {
// 		makeHooksSafe(routes.childRoutes, store);
// 	}
//
// 	if (routes.indexRoute) {
// 		makeHooksSafe(routes.indexRoute, store);
// 	}
//
// 	return routes;
// }
//
// function addOnlyAnonymousHook(routes, store) {
// 	const originOnEnter = routes.onEnter;
//
// 	routes.onEnter = function (nextState, redirect) {
// 		const state = store.getState();
// 		if (state.account.loginStatus !== loginStatus.ANONIMOUS) {
// 			redirect('/');
// 		}
// 		if (originOnEnter) {
// 			originOnEnter.call(routes);
// 		}
// 	}
// }
//
// function addLoginRequiredHook(routes, store) {
// 	const originOnEnter = routes.onEnter;
//
// 	routes.onEnter = function (nextState, redirect) {
// 		const state = store.getState();
// 		if (state.account.loginStatus === loginStatus.ANONIMOUS) {
// 			redirect({
// 				pathname: '/signin',
// 				query: {...nextState.location.query, backPathname: nextState.location.pathname}
// 			});
// 		}
// 		if (originOnEnter) {
// 			originOnEnter.call(routes);
// 		}
// 	}
// }
//
// export function makeRouteHooksSafe(modules) {
// 	return (store) => makeHooksSafe(createRoutes(getRoutes(modules, store)), store);
// }


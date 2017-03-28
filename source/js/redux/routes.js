import React from 'react';
import {Route} from 'react-router';
import {createRoutes} from 'react-router/lib/RouteUtils';
const loginStatus = {};//TODO

export default function getRoutes(modules) {
	return (
		<Route>
			{modules.filter((m) => isFunc(m.getRoutes)).map((m) => m.getRoutes())}
			{/*<Route path="*" component={NotFound} status={404}/>*/}
		</Route>
	);
}

function isFunc(f) {
	return typeof f === 'function';
}


// Wrap the hooks so they don't fire if they're called before
// the store is initialised. This only happens when doing the first
// client render of a route that has an onEnter hook
function makeHooksSafe(routes, store) {
	if (Array.isArray(routes)) {
		return routes.map((route) => makeHooksSafe(route, store));
	}

	if (routes.loginRequired) {
		addLoginRequiredHook(routes, store)
	}

	if (routes.onlyAnonymous) {
		addOnlyAnonymousHook(routes, store)
	}

	const onEnter = routes.onEnter;

	if (onEnter) {
		routes.onEnter = function safeOnEnter(...args) {
			try {
				store.getState();
			} catch (err) {
				if (onEnter.length === 3) {
					args[2]();
				}

				// There's no store yet so ignore the hook
				return;
			}

			onEnter.apply(null, args);
		};
	}

	if (routes.childRoutes) {
		makeHooksSafe(routes.childRoutes, store);
	}

	if (routes.indexRoute) {
		makeHooksSafe(routes.indexRoute, store);
	}

	return routes;
}

function addOnlyAnonymousHook(routes, store) {
	const originOnEnter = routes.onEnter;

	routes.onEnter = function (nextState, redirect) {
		const state = store.getState();
		if (state.account.loginStatus !== loginStatus.ANONIMOUS) {
			redirect('/');
		}
		if (originOnEnter) {
			originOnEnter.call(routes);
		}
	}
}

function addLoginRequiredHook(routes, store) {
	const originOnEnter = routes.onEnter;

	routes.onEnter = function (nextState, redirect) {
		const state = store.getState();
		if (state.account.loginStatus === loginStatus.ANONIMOUS) {
			redirect({
				pathname: '/signin',
				query: {...nextState.location.query, backPathname: nextState.location.pathname}
			});
		}
		if (originOnEnter) {
			originOnEnter.call(routes);
		}
	}
}

export function makeRouteHooksSafe(modules) {
	return (store) => makeHooksSafe(createRoutes(getRoutes(modules, store)), store);
}


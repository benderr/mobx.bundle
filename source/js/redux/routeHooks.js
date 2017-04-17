import {isAuthenticate} from 'infrastructure/helpers/accountSelectors'

// Wrap the hooks so they don't fire if they're called before
// the store is initialised. This only happens when doing the first
// client render of a route that has an onEnter hook
export function makeHooksSafe(routes, store) {
	if (Array.isArray(routes)) {
		return routes.map((route) => makeHooksSafe(route, store));
	}

	addAllowAnonymousHook(routes, store)

	if (routes.onlyAnonymous) {
		addOnlyAnonymousHook(routes, store)
	}

	const onEnter = routes.onEnter;

	if (onEnter) {
		routes.onEnter = (...args) => {
			try {
				store.getState();
			} catch (err) {
				if (onEnter.length === 3) {
					args[2]();
				}
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
		if (isAuthenticate(state)) {
			redirect('/');
		}
		if (originOnEnter) {
			originOnEnter.call(routes);
		}
	}
}

function addAllowAnonymousHook(route, store) {
	const originOnEnter = route.onEnter;

	route.onEnter = function (nextState, replace, cb) {
		const state = store.getState();
		if (!isAuthenticate(state) && !route.allowAnonymous) {
			//console.log('redirect');
			replace({
				pathname: 'signin',
				query: {...nextState.location.query, backPathname: nextState.location.pathname}
			});
			//replace('/signin')
		}
		if (originOnEnter) {
			originOnEnter.call(route);
		}
	}
}

export function makeRouteHooksSafe(routes) {
	return (store) => makeHooksSafe(routes, store);
}


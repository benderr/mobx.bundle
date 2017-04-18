//import {isAuthenticate} from 'infrastructure/helpers/accountSelectors'
import {checkProfile} from 'modules/account/selectors/accountSelectors'
// import {checkProfileValid} from 'modules/account/actions/loginActions'

// Wrap the hooks so they don't fire if they're called before
// the store is initialised. This only happens when doing the first
// client render of a route that has an onEnter hook
export function makeHooksSafe(routes, store) {
	if (Array.isArray(routes)) {
		return routes.map((route) => makeHooksSafe(route, store));
	}

	addAllowAnonymousHook(routes, store);

	if (routes.onlyAnonymous) {
		//addOnlyAnonymousHook(routes, store)
	}

	//addInitHook(routes, store);

	//todo сомнительный код, не понятно для чего тут
	//const onEnter = routes.onEnter;
	// if (onEnter) {
	// 	routes.onEnter = (...args) => {
	// 		try {
	// 			store.getState();
	// 		} catch (err) {
	// 			if (onEnter.length === 3) {
	// 				args[2]();
	// 			}
	// 			return;
	// 			console.error(err);
	// 		}
	//
	// 		onEnter.apply(null, args);
	// 	};
	// }

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
		// if (isAuthenticate(state)) {
		// 	redirect('/');
		// }
		// if (originOnEnter) {
		// 	originOnEnter.call(routes);
		// }
	}
}

function addAllowAnonymousHook(route, store) {
	const originOnEnter = route.onEnter;

	route.onEnter = function (nextState, replace, cb) {
		if (!route.allowAnonymous) {
			validateProfile(store)
				.then(finish)
				.catch(() => {
					replace({
						pathname: 'signin',
						query: {...nextState.location.query, redirectUrl: nextState.location.pathname}
					});
					finish();
				});
		} else {
			finish();
		}

		function validateProfile(store) {
			return new Promise((resolve, reject) => {
				const profileState = checkProfile(store.getState());
				if (profileState == 'ok') {
					resolve();
				} else if (profileState == 'error') {
					reject();
				}
				else {
					const unsubscribe = store.subscribe(() => {
						const profileState = checkProfile(store.getState());
						if (profileState == 'ok') {
							unsubscribe();
							resolve();
						} else if (profileState == 'error') {
							unsubscribe();
							reject();
						}
					});
				}
			});
		}

		function finish() {
			try {
				if (originOnEnter) {
					originOnEnter.call(route);
				}
				cb();
			} catch (er) {
				console.error('LOCATION_CHANGE_ERROR', er);
			}
		}
	}
}

export function makeRouteHooksSafe(routes) {
	return (store) => makeHooksSafe(routes, store);
}


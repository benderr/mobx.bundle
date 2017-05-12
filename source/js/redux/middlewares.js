import logger from 'dev/logger';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import DevTools from 'dev/DevTools.jsx';
import createSagaMiddleware from 'redux-saga';
//import {routerMiddleware} from 'react-router-redux'
//import {browserHistory} from 'react-router'
import { connectRouter, routerMiddleware } from 'connected-react-router'
const sagaMiddleware = createSagaMiddleware();

/**
 *
 * @param modules
 * @returns {[*,*]}
 */
export function getMiddlewares(modules, history) {

	let middlewares = [thunk];

	let composerFuncs = [];

	middlewares.push(routerMiddleware(history));

	modules.forEach((module) => {
		if (module.getMiddlewares)
			middlewares.push(module.getMiddlewares());
	});

	middlewares.push(sagaMiddleware);

	if (__DEV__ && __LOGGER__) {
		middlewares.push(logger);
	}

	if (__DEV_TOOLS__)
		composerFuncs.push(DevTools.instrument());

	return [
		applyMiddleware(...middlewares),
		...composerFuncs
	];

}
export function getSagas(modules) {
	return modules.reduce((list, module) => {
		if (module.getSagas) {
			return list.concat(module.getSagas());
		}
		return list;
	}, []);
}

export {sagaMiddleware};
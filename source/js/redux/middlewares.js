import logger from 'dev/logger';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import {reduxReactRouter} from 'redux-router';
import {createHistory} from 'history';
import DevTools from 'dev/DevTools.jsx';
import createSagaMiddleware from 'redux-saga';
import financeSaga from './../modules/finance/sagas/financeSagas.js';
const sagaMiddleware = createSagaMiddleware();


export function getMiddlewares(modules) {
	let middlewares = [thunk];
	let composerFuncs = [reduxReactRouter({createHistory})];

	modules.forEach((module)=>{
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
export function getSagas(modules){
	return modules.reduce((list, module)=>{
		if (module.getSagas){
			return list.concat(module.getSagas());
		}
		return list;
	}, []);
}
export {sagaMiddleware};
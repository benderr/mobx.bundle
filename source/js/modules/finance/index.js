import * as financeReducers from './reducers/reducers'
import * as routes  from './routes.js'
import logger from './middlewares/financeLogger'
import {mySaga} from './sagas/financeSagas.js';

export function getReducers(createReducer) {
	return {
		finance: createReducer(financeReducers.initialState, financeReducers.actionHandlers)
	}
}

export function getMiddlewares() {
	return logger;

}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [mySaga()]
}

export function init() {

}

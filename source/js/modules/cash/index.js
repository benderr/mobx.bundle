import * as reducers from './reducers/reducers'
import * as routes  from './routes.js'
import logger from './middlewares/cashLogger'
import cashSagas from './sagas/cashSagas';

export function getReducers(createReducer) {
	return {
		finance: createReducer(reducers.initialState, reducers.actionHandlers)
	}
}

export function getMiddlewares() {
	return logger;
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [cashSagas()]
}
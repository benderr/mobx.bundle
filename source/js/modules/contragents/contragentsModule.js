import * as listReducer from './reducers/listReducer'
import * as routes  from './routes.js'
import sagas from './sagas/listSaga';

export function getReducers(createReducer) {
	return {
		// finance: createReducer(listReducer.initialState, reducers.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return []
}
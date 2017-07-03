import * as listReducer from './reducers/listReducer';
import * as routes  from './routes.js'
import listSaga from './sagas/listSaga';

export function getReducers(createReducer) {
	return {
		list: createReducer(listReducer.initialState, listReducer.actionHandlers),
		// edit: createReducer(editReducers.initialState, editReducers.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		listSaga()
	]
}
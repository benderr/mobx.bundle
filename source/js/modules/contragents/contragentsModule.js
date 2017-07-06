import * as listReducer from './reducers/listReducer';
import * as editReducer from './reducers/editReduser';
import * as routes  from './routes.js'
import listSaga from './sagas/listSaga';
import editSaga from './sagas/editSaga';

export function getReducers(createReducer) {
	return {
		list: createReducer(listReducer.initialState, listReducer.actionHandlers),
		edit: createReducer(editReducer.initialState, editReducer.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		listSaga(),
		editSaga()
	]
}
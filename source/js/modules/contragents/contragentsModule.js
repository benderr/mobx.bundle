import * as listReducer from './reducers/contragentListReducer'
import * as routes  from './routes.js'
import contragentSaga from './sagas/contragentSaga'

export function getReducers(createReducer) {
	return {
		listContragent: createReducer(listReducer.initialState, listReducer.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		contragentSaga()
	]
}
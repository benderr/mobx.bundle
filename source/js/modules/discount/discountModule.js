import * as reducers from './reducers/discountReducer'
import * as routes  from './routes.js'

export function getReducers(createReducer) {
	return {
		// finance: createReducer(reducers.initialState, reducers.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [

	]
}
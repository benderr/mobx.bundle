import * as financeReducers from './reducers/reducers'
import * as routes  from './routes.js'


export function getReducers(createReducer) {

	return {
		finance: createReducer(financeReducers.initialState, financeReducers.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function init() {

}

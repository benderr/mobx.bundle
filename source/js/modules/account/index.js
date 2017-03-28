import * as accountReducers from './reducers/reducer'
import * as secondReducer from './reducers/secondReducer'

import * as routes  from './routes.js'


export function getReducers(createReducer) {

	return {
		account: createReducer(accountReducers.initialState, accountReducers.actionHandlers),
		transactions: createReducer(secondReducer.initialState, secondReducer.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function init() {
	//composeApi(api);
}

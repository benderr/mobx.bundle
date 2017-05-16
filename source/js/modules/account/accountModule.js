import * as authReducers from './reducers/authReducer'
import * as retailPointReducer from './reducers/retailPointReducer'
import * as routes  from './routes.js'
import authorizeSaga from './sagas/authorizeSaga'

export function getReducers(createReducer) {
	return {
		auth: createReducer(authReducers.initialState, authReducers.actionHandlers),
		retailPointsData: createReducer(retailPointReducer.initialState, retailPointReducer.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		authorizeSaga()
	];
}

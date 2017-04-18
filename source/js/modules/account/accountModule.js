import * as authReducers from './reducers/authReducer'
import * as loginInfoReducers from './reducers/loginInfoReducer'
import * as routes  from './routes.js'
import authorize from './sagas/authorize'
import appRunSaga from './sagas/appRunSaga'

export function getReducers(createReducer) {
	return {
		auth: createReducer(authReducers.initialState, authReducers.actionHandlers),
		loginInfo: createReducer(loginInfoReducers.initialState, loginInfoReducers.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		authorize(),
		appRunSaga()
	];
}

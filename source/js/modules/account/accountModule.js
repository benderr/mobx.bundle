import * as authReducers from './reducers/authReducer'
import * as accountReducers from './reducers/accountReducer'
import * as routes  from './routes.js'
import authorizeSaga from './sagas/authorizeSaga'
import accountSaga from './sagas/accountSaga'

export function getReducers(createReducer) {
	return {
		auth: createReducer(authReducers.initialState, authReducers.actionHandlers),
		account: createReducer(accountReducers.initialState, accountReducers.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		authorizeSaga(),
		accountSaga()
	];
}

import * as authReducers from './reducers/authReducer';
import * as regReducers from './reducers/regReducer';
import * as routes  from './routes.js';
import authorizeSaga from './sagas/authorizeSaga';
import registrationSaga from './sagas/registrationSaga';

export function getReducers(createReducer) {
	return {
		auth: createReducer(authReducers.initialState, authReducers.actionHandlers),
		reg: createReducer(regReducers.initialState, regReducers.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		authorizeSaga(),
		registrationSaga()
	];
}

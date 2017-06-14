import * as authReducers from './reducers/authReducer';
import * as regReducers from './reducers/regReducer';
import * as forgotReducer from './reducers/forgotReducer';
import * as changePasswordReducer from './reducers/changePasswordReducer';
import * as routes  from './routes.js';
import authorizeSaga from './sagas/authorizeSaga';
import accountSaga from './sagas/accountSaga';

export function getReducers(createReducer) {
	return {
		auth: createReducer(authReducers.initialState, authReducers.actionHandlers),
		reg: createReducer(regReducers.initialState, regReducers.actionHandlers),
		forgot: createReducer(forgotReducer.initialState, forgotReducer.actionHandlers),
		changePassword: createReducer(changePasswordReducer.initialState, changePasswordReducer.actionHandlers)
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

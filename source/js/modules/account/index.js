import moduleReducers from './reducers/reducer'
import {getRoutes as _getRoutes}  from './routes.js'

export function getReducers(createReducer) {
	return {
		app: moduleReducers(createReducer)
	}
}

export function getRoutes() {
	return _getRoutes();
}

export function init() {
	//composeApi(api);
}

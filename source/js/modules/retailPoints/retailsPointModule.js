import * as retailPointReducer from '../retailPoints/reducers/retailPointReducer'
import * as routes  from './routes.js'
import sagas from './sagas/retailPointsSaga'

export function getReducers(createReducer) {
	return {
		retailPointsData: createReducer(retailPointReducer.initialState, retailPointReducer.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		//sagas()
	];
}

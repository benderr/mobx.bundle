import * as retailPointsReducer from '../retailPoints/reducers/retailPointsReducer';
import * as routes  from './routes.js';
import sagas from './sagas/retailPointsSaga';

export function getReducers(createReducer) {
	return {
		retailPointsData: createReducer(retailPointsReducer.initialState, retailPointsReducer.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		sagas()
	];
}

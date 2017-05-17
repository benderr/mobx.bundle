import * as routes  from './routes.js';
import * as productsReducer from './reducers/productsReducer';
import productsSaga from './sagas/productsSaga';

export function getReducers(createReducer) {
	return {
		products: createReducer(productsReducer.initialState, productsReducer.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		productsSaga()
	];
}

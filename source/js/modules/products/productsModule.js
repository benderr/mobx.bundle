import * as routes  from './routes.js';
import * as productsReducer from './reducers/productsReducer';
import * as productDetailsReducer from './reducers/productDetailsReducer';
import * as importReducer from './reducers/importReducer';
import productsSaga from './sagas/productsSaga';

export function getReducers(createReducer) {
	return {
		products: createReducer(productsReducer.initialState, productsReducer.actionHandlers),
		productDetails: createReducer(productDetailsReducer.initialState, productDetailsReducer.actionHandlers),
		imports: createReducer(importReducer.initialState, importReducer.actionHandlers)
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

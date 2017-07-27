import * as orderReducers from './reducers/orderReducers'
import chequeReducers from './reducers/chequeReducers'
import * as shopDocsReducers from './reducers/shopDocsReducers'

import * as routes from './routes.js'
import orderSagas from './sagas/orderSagas';
import chequeSagas from './sagas/chequeSagas';
import shopDocSagas from './sagas/shopDocSagas';

export function getReducers(createReducer) {
	return {
		orders: createReducer(orderReducers.initialState, orderReducers.actionHandlers),
		cheques: chequeReducers(createReducer),
		iShopDocs: createReducer(shopDocsReducers.initialState, shopDocsReducers.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		orderSagas(),
		chequeSagas(),
		shopDocSagas()
	]
}
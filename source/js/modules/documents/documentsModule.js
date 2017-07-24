import * as orderReducers from './reducers/orderReducers'
import * as routes  from './routes.js'
import orderSagas from './sagas/orderSagas';

export function getReducers(createReducer) {
	return {
		orders: createReducer(orderReducers.initialState, orderReducers.actionHandlers),
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [orderSagas()]
}
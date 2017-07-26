import * as orderReducers from './reducers/orderReducers'
import chequeReducers from './reducers/chequeReducers'
import moneyReducers from './reducers/moneyReducers'
import * as routes from './routes.js'
import orderSagas from './sagas/orderSagas';
import chequeSagas from './sagas/chequeSagas';
import moneySaga from './sagas/moneySagas'

export function getReducers(createReducer) {
	return {
		orders: createReducer(orderReducers.initialState, orderReducers.actionHandlers),
		cheques: chequeReducers(createReducer),
		money: moneyReducers(createReducer)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		orderSagas(),
		chequeSagas(),
		moneySaga()
	]
}
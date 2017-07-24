import {Map, List, fromJS} from 'immutable';
import * as actions from '../actions/orderActions';
import createRequestReducer from 'modules/core/reducers/createRequestReducer'
import {create} from '../dataProvider/inventPositionFactory';

export const initialState = Map({
	loading: false,
	totalCount: 0,
	noItems: false,
	pos: 0,
	orders: List([]),
	error: null,
	ordersFilter: Map({
		start: 0,
		totalCount: null,
		count: null
	}),
	createOrder: Map({
		products: Map({}),
		error: null,
		saving: false,
		saved: false,
		searchProductsResult: Map({
			loading: false,
			error: null,
			products: List([])
		})
	})
});

const searchProductReducer = createRequestReducer(actions.SEARCH_PRODUCTS, ['createOrder', 'searchProductsResult'])
	.setRequest((data) => data.merge({loading: true}))
	.setFailure((data, {error}) => data.merge({
		loading: false,
		error: fromJS(error)
	}))
	.setSuccess((data, {products}) => data.merge({
		loading: false,
		products: fromJS(products),
		error: null
	}))
	.get();

const isEmpty = (val) => {
	return val === '' || val === null || val === undefined;
};

export const actionHandlers = {
	[actions.GET_ORDERS.REQUEST]: (state, action) => {
		return state.merge({loading: true});
	},
	[actions.SEARCH_ORDERS]: (state, action) => {
		return state.merge({loading: true});
	},
	[actions.GET_ORDERS.SUCCESS]: (state, {totalCount, pos, orders}) => {
		const filter = state.getIn(['ordersFilter', 'filter']);
		return state.merge({
			loading: false,
			noItems: filter == null && totalCount == 0,
			orders: pos > 0 ? state.get('orders').concat(fromJS(orders)) : fromJS(orders)
		}).setIn(['ordersFilter', 'totalCount'], totalCount);
	},
	[actions.GET_ORDERS.FAILURE]: (state, {error}) => {
		return state.merge({loading: false, error: fromJS(error)});
	},
	[actions.ADD_PRODUCT]: (state, {product}) => {
		const inventPosition = create(product);
		return state.updateIn(['createOrder', 'products'], products => products.setIn([inventPosition.id], fromJS(inventPosition)));
	},
	[actions.REMOVE_PRODUCT]: (state, {id}) => {
		return state.updateIn(['createOrder', 'products'], products => products.delete(id));
	},
	[actions.CREATE_ORDER.REQUEST]: (state) => {
		return state.updateIn(['createOrder', 'saving'], saving => true);
	},
	[actions.CREATE_ORDER.SUCCESS]: (state, {order}) => {
		return state.mergeIn(['createOrder'], {saving: false, error: null, saved: true})
			.updateIn(['orders'], orders => orders.unshift(fromJS(order)));
	},
	[actions.CREATE_ORDER.FAILURE]: (state, {error}) => {
		return state.mergeIn(['createOrder'], {saving: false, error: fromJS(error)});
	},
	[actions.RESET_ORDER]: (state) => {
		return state.mergeIn(['createOrder'], initialState.get('createOrder'));
	},

	[actions.SET_ORDERS_FILTER]: (state, {filter}) => {
		if (filter.restart) {
			const newFilter = filter;
			newFilter.start = 0;
			newFilter.totalCount = null;
			return state.mergeIn(['ordersFilter'], fromJS(newFilter));
		}
		return state.mergeIn(['ordersFilter'], fromJS(filter));
	},
	[actions.CORRECT_FILTER]: (state, {pos}) => {
		const count = state.getIn(['ordersFilter', 'count'], 0);
		return state.setIn(['ordersFilter', 'start'], pos + count);
	},
	...searchProductReducer,
};

export default (createReducer) => createReducer(initialState, actionHandlers);

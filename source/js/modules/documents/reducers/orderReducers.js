import {Map, List, fromJS} from 'immutable';
import * as actionEnums from '../enums/orderActions';

export const initialState = Map({
	loading: false,
	totalCount: 0,
	noItems: false,
	pos: 0,
	orders: List([]),
	details: Map({}),
	error: null
});

export const actionHandlers = {
	[actionEnums.GET_ORDERS.REQUEST]: (state, action) => {
		return state.merge({loading: true});
	},
	[actionEnums.GET_ORDERS.SUCCESS]: (state, {pos, totalCount, orders, isFirst}) => {
		return state.merge({
			loading: false,
			noItems: isFirst && totalCount == 0,
			pos,
			totalCount,
			orders: fromJS(orders)
		});
	},
	[actionEnums.GET_ORDERS.FAILURE]: (state, {error}) => {
		return state.merge({loading: false, error: fromJS(error)});
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);

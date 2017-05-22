/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import {Map, List} from 'immutable';
import {GET_PRODUCTS, GET_FILTRED_PRODUCTS} from '../enums/actions';

export const initialState = Map({
	loading: true,
	error: null,
	productsList: List([]),
	productListTotalCount: 0
});

export const actionHandlers = {

	[GET_PRODUCTS.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			error: null
		});
	},

	[GET_FILTRED_PRODUCTS.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			error: null,
			productsList: List([]),
		});
	},

	[GET_PRODUCTS.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			error: null,
			productsList: state.get('productsList').concat(action.response.productsList),
			productListTotalCount: action.response.totalCount
		});
	},

	[GET_PRODUCTS.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: action.error
		});
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);

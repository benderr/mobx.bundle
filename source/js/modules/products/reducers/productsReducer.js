/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import {GET_PRODUCTS} from '../enums/actions';

import Product from '../model/Product';
import ProductMap from '../model/ProductMap'

export const initialState = ProductMap();

export const actionHandlers = {

	[GET_PRODUCTS.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			error: null,
			productsList: null
		});
	},

	[GET_PRODUCTS.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			error: null,
			productsList: action.response.productsList.map((item) => new Product(item))
		});
	},

	[GET_PRODUCTS.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: action.error,
			productsList: null
		});
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);

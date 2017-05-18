/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import {Map} from 'immutable';
import {GET_PRODUCTS} from '../enums/actions';

export const initialState = Map({
	loading: true,
	error: null,
	productsList: null
});

export const actionHandlers = {

	[GET_PRODUCTS.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			error: null,
			productsList: []
		});
	},

	[GET_PRODUCTS.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			error: null,
			productsList: action.response.productsList
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

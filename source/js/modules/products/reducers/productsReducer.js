import {GET_PRODUCTS, GET_FILTRED_PRODUCTS, GET_PRODUCT_DETAIL, SAVE_PRODUCT_DETAIL, RESET_PRODUCTS_LIST} from '../enums/actions';
import {Map, List, fromJS} from 'immutable';

export const initialState = Map({
	loading: true,
	error: null,
	productsList: List([]),
	productListTotalCount: 0,
	productView: Map({})
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
			productsList: state.get('productsList').concat(fromJS(action.response.productsList)), //todo заменить на селектор
			productListTotalCount: action.response.totalCount
		});
	},

	[GET_PRODUCTS.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: fromJS(action.error),
		});
	},


	[GET_PRODUCT_DETAIL.REQUEST]: (state, {inventCode}) => {
		return state.setIn(['productView', inventCode],
			Map({
				loading: true,
				product: null,
				error: null
			}));
	},

	[GET_PRODUCT_DETAIL.SUCCESS]: (state, {product}) => {
		return state.setIn(['productView', product.inventCode],
			Map({
				loading: false,
				product: fromJS(product),
				error: null
			}));
	},

	[GET_PRODUCT_DETAIL.FAILURE]: (state, {inventCode, error}) => {
		return state.setIn(['productView', inventCode],
			Map({
				loading: false,
				product: null,
				error: fromJS(error)
			}));
	},

	[SAVE_PRODUCT_DETAIL.REQUEST]: (state, {product}) => {
		return state.setIn(['productView', product.inventCode, 'saving'], true);
	},

	[SAVE_PRODUCT_DETAIL.SUCCESS]: (state, {product}) => {
		return state.setIn(['productView', product.inventCode, 'saving'], false);
	},

	[SAVE_PRODUCT_DETAIL.FAILURE]: (state, {inventCode, error}) => {
		return state.setIn(['productView', inventCode, 'error'], fromJS(error));
	},

	[RESET_PRODUCTS_LIST.type]:(state)=>{
		return state.setIn(['productsList'], List([]))
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);

import {
	GET_PRODUCTS, GET_FILTRED_PRODUCTS, RESET_PRODUCTS_LIST,
	ADD_PRODUCT_TO_LIST, UPDATE_PRODUCT_IN_LIST, REMOVE_PRODUCT
} from '../enums/actions';
import {Map, List, fromJS} from 'immutable';

export const initialState = Map({
	loading: true,
	error: null,
	productsList: List([]),
	productListTotalCount: 0,
	noProducts: false
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
			noProducts: false,
			productsList: List([]),
		});
	},

	[GET_PRODUCTS.SUCCESS]: (state, {response, initialRequest = false}) => {
		const products = state.get('productsList').concat(fromJS(response.productsList));
		return state.merge({
			loading: false,
			error: null,
			productsList: products,
			noProducts: initialRequest && products.size == 0,
			productListTotalCount: response.totalCount
		});
	},

	[GET_PRODUCTS.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			noProducts: false,
			error: fromJS(action.error),
		});
	},

	[ADD_PRODUCT_TO_LIST]: (state, {product}) => {
		return state.merge({
			productsList: state.get('productsList').unshift(fromJS(product)),
			productListTotalCount: state.get('productListTotalCount') + 1,
			noProducts: false
		});
	},

	[UPDATE_PRODUCT_IN_LIST]: (state, {product}) => {
		const entry = state.get('productsList').findEntry(s => s.get('inventCode') == product.inventCode);
		return entry ? state.updateIn(['productsList', entry[0]], m => m.merge(fromJS(product))) : state;
	},

	[RESET_PRODUCTS_LIST]: (state) => {
		return state.setIn(['productsList'], List([]))
	},

	[REMOVE_PRODUCT.SUCCESS]: (state, {inventCode}) => {
		let productsList = state.get('productsList');
		const entry = productsList.findEntry(s => s.get('inventCode') == inventCode);
		if (entry) {
			productsList = productsList.delete(entry[0]);
			return state.merge({
				noProducts: productsList.size == 0,
				productsList: productsList,
				productListTotalCount: state.get('productListTotalCount') - 1
			})
		}
		return state;
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);

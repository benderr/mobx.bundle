import {
	GET_PRODUCTS, GET_FILTRED_PRODUCTS, GET_PRODUCT_DETAIL, SAVE_PRODUCT_DETAIL,
	SAVE_MODIFIER, SAVE_MODIFIER_GROUP, REMOVE_MODIFIER, REMOVE_MODIFIER_GROUP, RESET_PRODUCTS_LIST,
	SEARCH_PRODUCTS, SET_DEFAULT_SEARCH_PRODUCT, ADD_PRODUCT_DETAIL, ADD_PRODUCT_TO_LIST, UPDATE_PRODUCT_IN_LIST
} from '../enums/actions';
import {Map, List, fromJS} from 'immutable';

export const initialState = Map({
	loading: true,
	error: null,
	productsList: List([]),
	productListTotalCount: 0,
	productView: Map({}),
	searchProductsResult: Map({}) //результаты поиска
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
			productsList: state.get('productsList').concat(fromJS(action.response.productsList)),
			productListTotalCount: action.response.totalCount
		});
	},

	[GET_PRODUCTS.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: fromJS(action.error),
		});
	},

	[ADD_PRODUCT_TO_LIST]: (state, {product}) => {
		return state.merge({
			productsList: state.get('productsList').unshift(fromJS(product)),
			productListTotalCount: state.get('productListTotalCount') + 1
		});
	},

	[UPDATE_PRODUCT_IN_LIST]: (state, {product}) => {
		const entry = state.get('productsList').findEntry(s => s.get('inventCode') == product.inventCode);
		if (entry) {
			return state.updateIn(['productsList', entry[0]], m => m.merge(fromJS(product)))
		}
		return state;

		return state.merge({
			productsList: state.update('productsList').unshift(fromJS(product))
		});
	},

	[GET_PRODUCT_DETAIL.REQUEST]: (state, {inventCode}) => {
		return state.setIn(['productView', inventCode],
			Map({
				loading: true,
				product: null,
				error: null,
				saving: false,
				saved: false
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
		return state.updateIn(['productView', product.inventCode],
			view => view.merge(fromJS({
				saving: false,
				saved: true
			})));
	},

	[SAVE_PRODUCT_DETAIL.FAILURE]: (state, {inventCode, error}) => {
		return state.updateIn(['productView', inventCode], view => view.merge(fromJS({
			error: error,
			saving: false,
			saved: false
		})));
	},

	[SAVE_MODIFIER_GROUP]: (state, {inventCode, group}) => {
		const groupsKey = getProductGroupsKey(inventCode);
		const groups = state.getIn(groupsKey);

		if (group.id) {
			const groupEntry = groups.findEntry(s => s.get('id') == group.id);
			if (groupEntry) {
				return state.updateIn([...groupsKey, groupEntry[0]], group => group.merge(fromJS(group)))
			}
		} else {
			group.id = groups.size + 1;
			group.modifiers = [];
			return state.updateIn(groupsKey, list => list.push(fromJS(group)));
		}

		return state;
	},

	[REMOVE_MODIFIER_GROUP]: (state, {inventCode, groupId}) => {
		const groupsKey = getProductGroupsKey(inventCode);
		return state.updateIn(groupsKey, modifiers => modifiers.filter(s => s.get('id') != groupId))
	},

	[SAVE_MODIFIER]: (state, {inventCode, groupId, modifier}) => {
		const groupsKey = getProductGroupsKey(inventCode);
		const groupEntry = state.getIn(groupsKey).findEntry(s => s.get('id') == groupId);

		if (groupEntry) {
			const modifiers = groupEntry[1].get('modifiers');
			if (modifier.id) {
				const modifierEntry = modifiers.findEntry(s => s.get('id') == modifier.id);
				if (modifierEntry) {
					return state.updateIn([...groupsKey, groupEntry[0], 'modifiers', modifierEntry[0]],
						m => m.merge(fromJS(modifier)))
				}
			} else {
				modifier.id = modifiers.size + 1;
				return state.updateIn([...groupsKey, groupEntry[0], 'modifiers'], list => list.push(fromJS(modifier)));
			}
		}

		return state;
	},

	[REMOVE_MODIFIER]: (state, {inventCode, groupId, modifierId}) => {
		const groupsKey = getProductGroupsKey(inventCode);
		const groupEntry = state.getIn(groupsKey).findEntry(s => s.get('id') == groupId);
		if (groupEntry) {
			return state.updateIn([...groupsKey, groupEntry[0], 'modifiers'],
				modifiers => modifiers.filter(s => s.get('id') != modifierId))
		}
		return state;
	},

	[RESET_PRODUCTS_LIST]: (state) => {
		return state.setIn(['productsList'], List([]))
	},

	[SEARCH_PRODUCTS.REQUEST]: (state, {formKey}) => {
		return state.updateIn(['searchProductsResult', formKey, 'loading'], _ => true);
	},

	[SEARCH_PRODUCTS.SUCCESS]: (state, {formKey, products}) => {
		return state.updateIn(['searchProductsResult', formKey], data => data.merge({
			loading: false,
			products: fromJS(products),
			error: null
		}));
	},

	[SEARCH_PRODUCTS.FAILURE]: (state, {formKey, error}) => {
		return state.updateIn(['searchProductsResult', formKey], data => data.merge({
			loading: false,
			error: fromJS(error)
		}));
	},

	[SET_DEFAULT_SEARCH_PRODUCT]: (state, {formKey, defaultsProduct}) => {
		return state.updateIn(['searchProductsResult', formKey], Map({}), data => data.merge({
			loading: false,
			error: null,
			products: fromJS(defaultsProduct)
		}));
	},

	[ADD_PRODUCT_DETAIL]: (state, {product}) => {
		return state.setIn(['productView', product.inventCode],
			Map({
				loading: false,
				product: fromJS(product),
				error: null
			}));
	},
};

function getProductGroupsKey(inventCode) {
	return ['productView', inventCode, 'product', 'modifiers'];
}

export default (createReducer) => createReducer(initialState, actionHandlers);

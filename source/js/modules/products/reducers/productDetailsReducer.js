import {
	GET_PRODUCT_DETAIL, SAVE_PRODUCT_DETAIL, SEARCH_PRODUCTS,
	SET_DEFAULT_SEARCH_PRODUCT, ADD_PRODUCT_DETAIL, REMOVE_PRODUCT
} from '../enums/actions';
import {Map, fromJS} from 'immutable';
import createRequestReducer from 'modules/core/reducers/createRequestReducer'

export const initialState = Map({
	productView: Map({}),
	modifierGroups: Map({}),
	searchProductsResult: Map({}), //результаты поиска в выпадушке
});

const searchProductReducer = createRequestReducer(SEARCH_PRODUCTS, ['searchProductsResult'])
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

export const actionHandlers = {

	[GET_PRODUCT_DETAIL.REQUEST]: (state, {inventCode}) => {
		return state.setIn(['productView', inventCode],
			Map({
				loading: true,
				product: null,
				error: null,
				saving: false,
				saved: false,
				removing: false,
				removed: false
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

	// [SAVE_MODIFIER_GROUP.SUCCESS]: (state, {group}) => {
	// 	const groupsKey = getProductGroupsKey(group.inventCode);
	// 	const groups = state.getIn(groupsKey);
    //
	// 	const groupEntry = groups.findEntry(s => s.get('id') == group.code);
	// 	if (groupEntry) {
	// 		return state.updateIn([...groupsKey, groupEntry[0]], oldGroup => oldGroup.merge(fromJS(group)))
	// 	} else {
	// 		return state.updateIn(groupsKey, list => list.push(fromJS(group)));
	// 	}
	// },

	// [REMOVE_MODIFIER_GROUP]: (state, {inventCode, groupId}) => {
	// 	const groupsKey = getProductGroupsKey(inventCode);
	// 	return state.updateIn(groupsKey, modifiers => modifiers.filter(s => s.get('id') != groupId))
	// },

	// [SAVE_MODIFIER]: (state, {inventCode, groupId, modifier}) => {
	// 	const groupsKey = getProductGroupsKey(inventCode);
	// 	const groupEntry = state.getIn(groupsKey).findEntry(s => s.get('id') == groupId);
    //
	// 	if (groupEntry) {
	// 		const modifiers = groupEntry[1].get('modifiers');
	// 		if (modifier.id) {
	// 			const modifierEntry = modifiers.findEntry(s => s.get('id') == modifier.id);
	// 			if (modifierEntry) {
	// 				return state.updateIn([...groupsKey, groupEntry[0], 'modifiers', modifierEntry[0]],
	// 					m => m.merge(fromJS(modifier)))
	// 			}
	// 		} else {
	// 			modifier.id = modifiers.size + 1;
	// 			return state.updateIn([...groupsKey, groupEntry[0], 'modifiers'], list => list.push(fromJS(modifier)));
	// 		}
	// 	}
    //
	// 	return state;
	// },

	// [REMOVE_MODIFIER]: (state, {inventCode, groupId, modifierId}) => {
	// 	const groupsKey = getProductGroupsKey(inventCode);
	// 	const groupEntry = state.getIn(groupsKey).findEntry(s => s.get('id') == groupId);
	// 	if (groupEntry) {
	// 		return state.updateIn([...groupsKey, groupEntry[0], 'modifiers'],
	// 			modifiers => modifiers.filter(s => s.get('id') != modifierId))
	// 	}
	// 	return state;
	// },

	// [TOGGLE_MODIFIER]: (state, {inventCode, groupId, modifierId}) => {
	// 	const groupsKey = getProductGroupsKey(inventCode);
	// 	const groupEntry = state.getIn(groupsKey).findEntry(s => s.get('id') == groupId);
	// 	if (groupEntry) {
	// 		const modifierEntry = groupEntry[1].get('modifiers').findEntry(s => s.get('id') == modifierId);
	// 		if (modifierEntry) {
	// 			//todo base старый флаг выпилить
	// 			return state.updateIn([...groupsKey, groupEntry[0], 'modifiers', modifierEntry[0]],
	// 				modifier => modifier.merge({selected: !modifier.get('selected'), base: !modifier.get('selected')}))
	// 		}
	// 	}
	// 	return state;
	// },

	// [SEARCH_GROUPS.REQUEST]: (state, {formKey}) => {
	// 	return state.updateIn(['searchGroupsResult', formKey], Map({groups: []}), data =>
	// 		data.merge({
	// 			loading: true,
	// 			error: null
	// 		}));
	// },
    //
	// [SEARCH_GROUPS.SUCCESS]: (state, {formKey, groups}) => {
	// 	return state.updateIn(['searchGroupsResult', formKey], data => data.merge({
	// 		loading: false,
	// 		groups: fromJS(groups),
	// 		error: null
	// 	}));
	// },
    //
	// [SEARCH_GROUPS.FAILURE]: (state, {formKey, error}) => {
	// 	return state.updateIn(['searchGroupsResult', formKey], data => data.merge({
	// 		loading: false,
	// 		error: fromJS(error)
	// 	}));
	// },

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

	[REMOVE_PRODUCT.REQUEST]: (state, {inventCode}) => {
		return state.setIn(['productView', inventCode, 'removing'], true);
	},

	[REMOVE_PRODUCT.SUCCESS]: (state, {inventCode}) => {
		return state.updateIn(['productView', inventCode], map => map.merge({
			removing: false,
			removed: true
		}));
	},

	[REMOVE_PRODUCT.FAILURE]: (state, {inventCode, error}) => {
		return state.updateIn(['productView', inventCode], map => map.merge({
			removing: false,
			removed: false,
			error: fromJS(error)
		}));
	},
	...searchProductReducer,
};

function getProductGroupsKey(inventCode) {
	return ['productView', inventCode, 'product', 'modifiers'];
}

export default (createReducer) => createReducer(initialState, actionHandlers);

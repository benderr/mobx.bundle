import {
	GET_PRODUCTS, GET_FILTRED_PRODUCTS, GET_PRODUCT_DETAIL, SAVE_PRODUCT_DETAIL,
	SAVE_MODIFIER, SAVE_MODIFIER_GROUP, REMOVE_MODIFIER, REMOVE_MODIFIER_GROUP
} from '../enums/actions';
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

	[SAVE_MODIFIER_GROUP]: (state, {inventCode, group}) => {
		const {modifiers, modifiersKey} = getModifierGroups({state, inventCode});

		if (group.id) {
			//const modifierIndex = getModifierGroupIndex({modifiers, groupId: group.id});
			const groupsKey = getProductGroupsKey(inventCode);
			const groupEntry = state.getIn(groupsKey).findEntry(s => s.get('id') == group.id);
			if (groupEntry) {
				return state.updateIn([...groupsKey, groupEntry[0]], group => group.merge(fromJS(group)))
			}
			// if (modifierIndex >= 0)
			// 	return state.setIn(modifiersKey,
			// 		modifiers.update(modifierIndex, m => m.merge(fromJS(group))));
		} else {
			group.id = modifiers.size + 1;
			group.modifiers = [];
			return state.setIn(modifiersKey,
				modifiers.push(fromJS(group)));
		}

		return state;
	},

	[REMOVE_MODIFIER_GROUP]: (state, {inventCode, groupId}) => {
		// const {modifiers, modifiersKey} =getModifierGroups({state, inventCode, groupId});
		// const groupIndex = getModifierGroupIndex({modifiers, groupId});
		// if (groupIndex >= 0)
		// 	return state.setIn(modifiersKey, modifiers.delete(groupIndex));
		// return state;
		const groupsKey = getProductGroupsKey(inventCode);
		return state.updateIn(groupsKey, modifiers => modifiers.filter(s => s.get('id') != groupId))
	},

	[SAVE_MODIFIER_GROUP]: (state, {inventCode, group}) => {
		const {modifiers, modifiersKey} = getModifierGroups({state, inventCode});

		if (group.id) {
			const modifierIndex = getModifierGroupIndex({modifiers, groupId: group.id});
			if (modifierIndex >= 0)
				return state.setIn(modifiersKey,
					modifiers.update(modifierIndex, m => m.merge(fromJS(group))));
		} else {
			group.id = modifiers.size + 1;
			group.modifiers = [];
			return state.setIn(modifiersKey,
				modifiers.push(fromJS(group)));
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
	}
};

function getProductGroupsKey(inventCode) {
	return ['productView', inventCode, 'product', 'modifiers'];
}

function getModifierGroupIndex({modifiers, groupId}) {
	return modifiers.findIndex(item => item.get("id") === groupId);
}

function getModifierGroups({state, inventCode}) {
	const modifiersKey = ['productView', inventCode, 'product', 'modifiers'];
	return {
		modifiers: state.getIn(modifiersKey),
		modifiersKey: modifiersKey
	};
}

export default (createReducer) => createReducer(initialState, actionHandlers);

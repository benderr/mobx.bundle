/**
 * Created by RobertSabiryanov on 18.05.17.
 */
import {createSelector} from 'reselect'

export const getProductsData = (state) => {
	return state.get('products');
};

export const getProductsList = createSelector([getProductsData], data => {
	return data.get('productsList');
});

export const getProductListTotalCount = createSelector([getProductsData], data => {
	return data.get('productListTotalCount');
});

export const getProductView = (inventCode) => createSelector([getProductsData], data => {
	return data.getIn(['productView', inventCode], null);
});

export const getProductLoading = createSelector([getProductsData], data => {
	return data.get('loading');
});

export const getProductGroup = (state, inventCode, groupId) => {
	const productView = getProductView(inventCode)(state);
	if (productView) {
		const groups = productView.getIn(['product', 'modifiers']);
		const groupIndex = groups.findIndex(item => item.get("id") === groupId);
		if (groupIndex >= 0)
			return groups.get(groupIndex);
	}
	return null;
};

export const getProductModifier = (state, inventCode, groupId, modifierId) => {
	const group = getProductGroup(state, inventCode, groupId);
	if (group) {
		const modifiers = group.get('modifiers');
		const modifierIndex = modifiers.findIndex(s => s.get('id') === modifierId);
		if (modifierIndex >= 0)
			return modifiers.get(modifierIndex);
	}
	return null;
};

import {createSelector} from 'reselect'
import {Map, List} from 'immutable';

export const getProductsData = (state) => {
	return state.get('products');
};

export const getProductDetailSection = (state) => {
	return state.get('productDetails');
};

export const getImportData = (state) => {
	return state.get('imports');
};

export const getProductsList = createSelector([getProductsData], data => {
	return data.get('productsList');
});

export const getNoProductsState = createSelector([getProductsData], data => {
	return data.get('noProducts');
});

export const getProductListTotalCount = createSelector([getProductsData], data => {
	return data.get('productListTotalCount');
});

export const getProductView = (inventCode) => createSelector([getProductDetailSection], data => {
	return data.getIn(['productView', inventCode], null);
});

export const getProductLoading = createSelector([getProductsData], data => {
	return data.get('loading');
});

export const getProductGroup = (state, inventCode, groupId) => {
	const productView = getProductView(inventCode)(state);
	if (productView) {
		const groupEntry = productView.getIn(['product', 'modifiers']).findEntry(item => item.get("id") === groupId);
		return groupEntry ? groupEntry[1] : null;
	}
	return null;
};

export const getProductModifier = (state, inventCode, groupId, modifierId) => {
	const group = getProductGroup(state, inventCode, groupId);
	if (group) {
		const modifierEntry = group.get('modifiers').findEntry(s => s.get('id') == modifierId);
		return modifierEntry ? modifierEntry[1] : null;
	}
	return null;
};

export const getSearchProducts = (formKey) => createSelector([getProductDetailSection], data => {
	return data.getIn(['searchProductsResult', formKey], Map({
		loading: false,
		products: List([]),
		error: null
	}));
});

export const getSearchGroups = (formKey) => createSelector([getProductDetailSection], data => {
	return data.getIn(['searchGroupsResult', formKey], Map({
		loading: false,
		groups: List([]),
		error: null
	}));
});
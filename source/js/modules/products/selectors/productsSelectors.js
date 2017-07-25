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

export const getSearchProducts = (formKey) => createSelector([getProductDetailSection], data => {
	return data.getIn(['searchProductsResult', formKey], Map({
		loading: false,
		products: List([]),
		error: null
	}));
});

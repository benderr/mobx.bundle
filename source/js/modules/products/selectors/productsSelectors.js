/**
 * Created by RobertSabiryanov on 18.05.17.
 */
import {createSelector} from 'reselect'

export const getProductsData = (state) => {
	return state.get('products');
};

export const getProductsList = createSelector([getProductsData], data => {
	const list = data.get('productsList');
	return list;
});

export const getProductListTotalCount = createSelector([getProductsData], data => {
	const list = data.get('productListTotalCount');
	return list;
});

export const getProduct = (id) => createSelector([getProductsList], products => {
	if (products)
		return products.filter(s => s.id == id)[0];
	return null;
});

export const getProductLoading = createSelector([getProductsData], data => {
	return data.get('loading');
});


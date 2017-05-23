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


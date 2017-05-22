/**
 * Created by RobertSabiryanov on 18.05.17.
 */
import {createSelector} from 'reselect'

export const getProductsData = (state) => {
	return state.products;
};

export const getProductsList = createSelector([getProductsData], data => {
	return data.get('productsList');
});

export const getProduct = (id) => createSelector([getProductsList], data => {
	const products = data.get('productsList');
	if (products)
		return products.filter(s => s.id == id)[0]
	return null;
});


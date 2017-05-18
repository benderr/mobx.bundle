/**
 * Created by RobertSabiryanov on 18.05.17.
 */
import {createSelector} from 'reselect'

export const getProductsData = (state) => {
	return state.products;
};

export const getProductsList = createSelector([getProductsData], data => {
	const list = data.get('productsList');
	return list != null ? list.toJS() : [];
});
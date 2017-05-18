import {createSelector} from 'reselect'

export const getSection = (state) => {
	return state.products;
};

export const getProducts = createSelector([getSection], (info) => {
	return info ? info.get('productsList2') : [];
});



import {createSelector} from 'reselect'

export const getSection = (state) => {
	return state.get('orders');
};

export const getOrders = createSelector([getSection], (section) => {
	return section ? section.get('orders') : null;
});

export const getLoader = createSelector([getSection], (section) => {
	return section ? section.get('loading') : false;
});

export const getNoItems = createSelector([getSection], (section) => {
	return section ? section.get('noItems') : false;
});

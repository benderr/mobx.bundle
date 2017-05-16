import {createSelector} from 'reselect'

export const getAuthData = (state) => {
	return state.auth.get('authData');
};

export const getRetailPointsData = (state) => {
	return state.retailPointsData;
};

export const getUser = createSelector([getAuthData], (info) => {
	return info ? info.get('user') : null;
});

export const getCompany = createSelector([getAuthData], (info) => {
	return info ? info.get('company') : null;
});

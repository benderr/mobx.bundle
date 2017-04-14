import {createSelector} from 'reselect'

export const getProfile = (state) => {
	return state.account.get('authData');
};

export const isAuthenticate = createSelector([getProfile], (profile) => {
	return profile && profile.get('token') != null;
});
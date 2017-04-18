import {createSelector} from 'reselect'

export const getAuthData = (state) => {
	return state.auth.get('authData');
};

export const getToken = createSelector([getAuthData], (auth) => {
	return auth && auth.get('token') != null;
});

export const getLoginInfo = (state) => {
	return state.loginInfo;
};

export const getProfile = createSelector([getLoginInfo], (info) => {
	return info ? info.get('profile') : null;
});

export const checkProfile = createSelector([getProfile, getLoginInfo], (profile, info) => {
	if (profile != null)
		return 'ok';
	if (info.get('profileError') != null)
		return 'error';
	return 'busy';
});
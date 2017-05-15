import {createSelector} from 'reselect'

export const getAuthData = (state) => {
	return state.auth.get('authData');
};

export const getUser = createSelector([getAuthData], (info) => {
	return info ? info.get('user') : null;
});

// export const checkProfile = createSelector([getProfile, getLoginInfo], (profile, info) => {
// 	if (profile != null)
// 		return 'ok';
// 	if (info.get('profileError') != null)
// 		return 'error';
// 	return 'busy';
// });
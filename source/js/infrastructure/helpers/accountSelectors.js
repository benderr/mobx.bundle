// import {createSelector} from 'reselect';
// import {Map, List} from 'immutable';
//
// const xTokenKey = 'X-TOKEN';
//
// export const getToken = (state) => {
// 	//return localStorage.getItem(xTokenKey);
// 	return state.account.get('authData');
// };
//
// export const isAuthenticate = createSelector([getToken], (profile) => {
// 	return profile && profile.get('token') != null;
// });

// import {createSelector} from 'reselect'
//
// export const getProfile = (state) => {
// 	return state.account.get('authData');
// };
//
// export const isAuthenticate = createSelector([getProfile], (profile) => {
// 	return profile && profile.get('token') != null;
// });
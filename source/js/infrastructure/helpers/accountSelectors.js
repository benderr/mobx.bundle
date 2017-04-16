import {createSelector} from 'reselect';
import {Map, List} from 'immutable';

var xTokenKey = 'X-TOKEN';

export const getToken = (state) => {
	return localStorage.getItem(xTokenKey);
};

export const isAuthenticate = createSelector([getToken], (token) => {
	return !!token;
});
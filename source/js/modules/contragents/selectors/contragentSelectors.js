import {createSelector} from 'reselect'

export const getListSection = (state) => {
	return state.get('listContragent');
};

export const getEditSection = (state) => {
	return state.get('editContragent');
};
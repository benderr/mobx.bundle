import {createSelector} from 'reselect'

export const getListSection = (state) => {
	return state.get('list');
};

export const getEditSection = (state) => {
	return state.get('edit');
};
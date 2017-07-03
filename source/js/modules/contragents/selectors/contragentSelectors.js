import {createSelector} from 'reselect'

export const getListSection = (state) => {
	return state.get('list');
};
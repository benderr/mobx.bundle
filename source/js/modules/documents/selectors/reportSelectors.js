import {createSelector} from 'reselect'

export const getReport = (state) => {
	return state.get('report');
};
import {createSelector} from 'reselect'

export const getChequesSection = (state) => {
	return state.get('cheques');
};

export const getListPropsState = createSelector([getChequesSection], state => ({
	sortField:		state.get('sortField'),
	sortDirection:	state.get('sortDirection'),
	countStep:		state.get('countStep'),
	pos:			state.get('pos'),
	q:				state.get('q'),
	filter:			state.get('filter').toJS(),
	noItems:		state.get('noItems')
}));
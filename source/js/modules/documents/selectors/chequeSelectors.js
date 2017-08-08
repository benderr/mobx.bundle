import {createSelector} from 'reselect'

export const getChequesSection = (state) => {
	return state.get('cheques');
};

export const getListPropsState = createSelector([getChequesSection], state => ({
	sortField:		state.get('sortField'),
	sortDirection:	state.get('sortDirection'),
	countStep:		state.get('countStep'),
	filter:			state.get('filter'),
	noItems:		state.get('noItems')
}));

export const getSectionPos = createSelector([getChequesSection], cheques => {
	return cheques.get('pos');
});

export const getSectionStep = createSelector([getChequesSection], cheques => {
	return cheques.get('listStep');
});

export const getSectionState = createSelector([getChequesSection], cheques => {
	return cheques;
});
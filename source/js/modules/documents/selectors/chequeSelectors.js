import {createSelector} from 'reselect'

export const getSection = (state) => {
	return state.get('cheques');
};

export const getSectionPos = createSelector([getSection], cheques => {
	return cheques.get('pos');
});

export const getSectionStep = createSelector([getSection], cheques => {
	return cheques.get('listStep');
});

export const getSectionState = createSelector([getSection], cheques => {
	return cheques;
});
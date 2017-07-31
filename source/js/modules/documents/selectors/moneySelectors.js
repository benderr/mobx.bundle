import {createSelector} from 'reselect'

export const getMoney = (state) => {
	return state.get('money');
};

export const getSectionPos = createSelector([getMoney], money => money.get('pos'));
export const getSectionStep = createSelector([getMoney], money => money.get('listStep'));
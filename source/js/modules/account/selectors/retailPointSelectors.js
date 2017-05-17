import {createSelector} from 'reselect'

export const getRetailPointsData = (state) => {
	return state.retailPointsData;
};

export const getRetailPointList = createSelector([getRetailPointsData], rpData => {
	return {points: rpData.get('retailPoints').toJS()};
});

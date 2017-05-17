import {createSelector} from 'reselect'

export const getRetailPointsData = (state) => {
	return state.retailPointsData;
};

export const getRetailPointList = createSelector([getRetailPointsData], rpData => {
	const points = rpData.get('retailPoints');
	return points != null ? points.toJS() : []
});

export const getCurrentRetailPointId = createSelector([getRetailPointsData], rpData => {
	return rpData.get('selectedPointId');
});


import {createSelector} from 'reselect'

export const getRetailPointsData = (state) => {
	return state.get('retailPointsData');
};

export const getRetailPointList = createSelector([getRetailPointsData], rpData => {
	return rpData.get('retailPoints');
});

export const getCurrentRetailPointId = createSelector([getRetailPointsData], rpData => {
	return rpData.get('selectedPointId');
});

// export const getCurrentRetailPoint = createSelector([getRetailPointsData], rpData => {
// 	const points = rpData.get('retailPoints');
// 	if (!points)
// 		return null;
// 	const index = points.findIndex(item => item.get('id') === getCurrentRetailPointId());
// 	return points.get(index);
// });

export const getRetailPointInLayer = createSelector([getRetailPointsData], rpData => {
	return rpData.getIn(['retailPointInLayer'], null);
});



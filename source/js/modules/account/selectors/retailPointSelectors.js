import {createSelector} from 'reselect'

export const getRetailPointsData = (state) => {
	return state.get('retailPointsData');
};

export let getRetailPointList = createSelector([getRetailPointsData], rpData => {
	return rpData.get('retailPoints');
});

export const getCurrentRetailPointId = createSelector([getRetailPointsData], rpData => {
	return rpData.get('selectedPointId');
});

Map.prototype.convertJS = function () {
	console.log(this);
};



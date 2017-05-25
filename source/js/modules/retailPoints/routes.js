import RetailPointsContainer from '../retailPoints/containers/RetailPointsContainer';
import AddRetailPointContainer from '../retailPoints/containers/AddRetailPointContainer';
import React from 'react';

export function getRoutes() {
	return {
		retailPoints:{
			path:'/retail-points',
			exact: true,
			component: RetailPointsContainer
		},
		retailPoint: {
			path: '/retail-points/add',
			exact: true,
			isLayer: true,
			layout: AddRetailPointContainer
		},
	};
}
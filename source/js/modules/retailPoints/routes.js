import RetailPointsContainer from '../retailPoints/containers/RetailPointsContainer';
import AddEditRetailPointContainer from '../retailPoints/containers/AddEditRetailPointContainer';
import React from 'react';

export function getRoutes() {
	return {
		retailPoints:{
			path:'/retail-points',
			exact: true,
			component: RetailPointsContainer
		},
		retailPointAdd: {
			path: '/retail-points/:action',
			exact: true,
			isLayer: true,
			layout: AddEditRetailPointContainer
		},
		retailPointEdit: {
			path: '/retail-points/:action/:id',
			exact: true,
			isLayer: true,
			layout: AddEditRetailPointContainer
		},

	};
}
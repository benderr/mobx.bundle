import RetailPointsContainer from '../retailPoints/containers/RetailPointsContainer';
import React from 'react';

export function getRoutes() {
	return {
		retailPoints:{
			path:'/retail-points',
			exact: true,
			component: RetailPointsContainer
		}
	};
}
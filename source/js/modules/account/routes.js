import SignInContainer from './containers/SignInContainer';
import RetailPointsContainer from './containers/RetailPointsContainer';
import React from 'react';
import ExternalLayout from 'components/ExternalLayout'

export function getRoutes() {
	return {
		signin: {
			path: '/signin',
			exact: true,
			allowAnonymous: true,
			component: SignInContainer,
			layout: ExternalLayout
		},
		retailPoints:{
			path:'/retail-points',
			exact: true,
			component: RetailPointsContainer
		}
	};
}
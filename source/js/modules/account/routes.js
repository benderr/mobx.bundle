import SignInContainer from './containers/SignInContainer';
import React from 'react';
import ExternalLayout from 'components/ExternalLayout'

export function getRoutes() {
	return [
		{
			path: 'signin',
			component: ExternalLayout,
			indexRoute: {component: SignInContainer, allowAnonymous: true},
			allowAnonymous: true
			// childRoutes: [
			// 	{
			// 		path: 'test/:id',
			// 		component: ExternalLayout,
			// 		indexRoute: {component: SignInContainer},
			// 	}]
		}
	];
}
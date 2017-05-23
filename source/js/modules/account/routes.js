import SignInContainer from './containers/SignInContainer';
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
		}
	};
}
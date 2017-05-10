import SignInContainer from './containers/SignInContainer';
import React from 'react';
import ExternalLayout from 'components/ExternalLayout'

export function getRoutes() {
	return {
		index: {
			path: '/',
			exact: true,
			component: () => (<h2>Hello World</h2>),
			index: true
		},
		signin: {
			path: '/signin',
			exact: true,
			component: SignInContainer,
			layout: ExternalLayout
		}
	};
}
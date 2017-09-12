import SignInContainer from './containers/SignInContainer';
import React from 'react';

export function getRoutes() {
	return {
		signin: {
			path: '/signin',
			exact: true,
			allowAnonymous: true,
			component: SignInContainer,
			layout: null
		},
		home: {
			path: '/',
			exact: true,
			allowAnonymous: true,
			component: () => (<div>Home page</div>),
		},
		documents: {
			path: '/documents',
			exact: true,
			allowAnonymous: true,
			component: () => (<div>Documents page</div>),
		}
	};
}
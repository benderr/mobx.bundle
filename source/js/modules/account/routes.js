import SignInContainer from './containers/SignInContainer';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';
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
		forgot: {
			path: '/forgot',
			exact: true,
			allowAnonymous: true,
			component: ForgotPasswordContainer,
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
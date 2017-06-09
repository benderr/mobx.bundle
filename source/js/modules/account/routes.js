import SignInContainer from './containers/SignInContainer';
import RegistrationContainer from './containers/RegistrationContainer';
import React from 'react';
import LoginLayout from 'components/LoginLayout';
import RegistrationLayout from 'components/RegistrationLayout';

export function getRoutes() {
	return {
		signin: {
			path: '/signin',
			exact: true,
			allowAnonymous: true,
			component: SignInContainer,
			layout: LoginLayout
		},
		registration: {
			path: '/registration',
			exact: true,
			allowAnonymous: true,
			component: RegistrationContainer,
			layout: RegistrationLayout
		}
	};
}
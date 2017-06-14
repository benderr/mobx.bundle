import SignInContainer from './containers/SignInContainer';
import RegistrationContainer from './containers/RegistrationContainer';
import ForgotContainer from './containers/ForgotContainer';
import SettingsContainer from './containers/SettingsContainer';
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
		},
		forgot: {
			path: '/forgot',
			exact: true,
			allowAnonymous: true,
			component: ForgotContainer,
			layout: LoginLayout
		},
		settings:{
			path:'/settings/:tab',
			exact: false,
			isLayer: true,
			layout: SettingsContainer
		},
		settings2:{
			path:'/settings',
			exact: true,
			isLayer: true,
			layout: SettingsContainer
		}
	};
}
import {ROUTES} from './enums/enums'
import SignInContainer from './containers/SignInContainer';
import ExternalLayout from 'components/ExternalLayout.jsx'
import React from 'react';
import {Route, Link} from 'react-router';

export function getRoutes() {
	return (
		<Route onlyAnonymous component={ExternalLayout}>
			<Route path={ ROUTES.SIGN_IN } component={SignInContainer}></Route>
		</Route>
	);
}
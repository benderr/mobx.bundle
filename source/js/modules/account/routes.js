import {ROUTES} from './enums/routes'
import SignInContainer from './containers/SignInContainer';
import ExternalLayout from 'components/ExternalLayout.jsx'
import React from 'react';
import {Route} from 'react-router';

export function getRoutes() {
	return (
		<div>
			<Route component={ExternalLayout}>
				<Route path={ ROUTES.SIGN_IN } component={SignInContainer}/>
			</Route>
		</div>
	);
}
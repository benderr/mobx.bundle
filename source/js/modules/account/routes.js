import {ROUTES} from './enums/enums'
import SignInContainer from './containers/SignInContainer';
import ListExample from './components/ListExample/index';
import ExternalLayout from 'components/ExternalLayout.jsx'
import InternalLayout from 'components/InternalLayout.jsx'
import React from 'react';
import {Route} from 'react-router';

export function getRoutes() {
	return (
		<div>
			<Route component={ExternalLayout}>
				<Route path={ ROUTES.SIGN_IN } component={SignInContainer}/>
			</Route>
			<Route component={InternalLayout}>
				<Route path={ ROUTES.LIST_EXAMPLE } component={ ListExample }/>
			</Route>
		</div>
	);
}
import {ROUTES} from './enums/enums'
import SignInContainer from './containers/SignInContainer';
import ListExample from './components/ListExample/index';
import ExternalLayout from 'components/ExternalLayout.jsx'
import InternalLayout from 'components/InternalLayout.jsx'
import React from 'react';
import {Route, Link} from 'react-router';

export function getRoutes() {
	return (
		<Route onlyAnonymous component={ExternalLayout}>
			<Route path={ ROUTES.HOME } component={InternalLayout}></Route>
			<Route path={ ROUTES.SIGN_IN } component={SignInContainer}></Route>
			<Route path={ ROUTES.LIST_EXAMPLE } component={ ListExample }/>
		</Route>
	);
}
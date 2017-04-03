import {ROUTES} from './enums/enums'
import TransactionsList from './components/TransactionsList/TransactionsList.jsx';
import ExternalLayout from 'components/ExternalLayout.jsx'
import React from 'react';
import {Route, Link} from 'react-router';

export function getRoutes() {
	return (
		<Route onlyAnonymous component={ExternalLayout}>
			<Route path={ ROUTES.FINANCE } component={ TransactionsList }/>
		</Route>
	);
}
import TransactionsList from './components/TransactionsList/TransactionsList.jsx';
import InternalLayout from 'components/InternalLayout'
import React from 'react';

export function getRoutes() {
	// return (
	// 	<Route onlyAnonymous component={ExternalLayout}>
	// 		<Route path={ ROUTES.FINANCE } component={ TransactionsList }/>
	// 	</Route>
	// );
	return [{
		path: 'finance',
		component: InternalLayout,
		indexRoute: {component: TransactionsList}
	}]
}
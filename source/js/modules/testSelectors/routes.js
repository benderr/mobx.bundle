import React from 'react';
import {Route, Link} from 'react-router';
import {TEST_SELECTOR, TEST_SELECTOR_CHILD} from './enums/routes'
import TransactionsContainer from './containers/TransactionsContainer'
import InternalLayout from 'components/InternalLayout.jsx'

export function getRoutes() {
	return (
		<Route component={InternalLayout}>
			<Route path={ '/' } />
			<Route path={ TEST_SELECTOR } component={ TransactionsContainer }/>
			<Route path={ TEST_SELECTOR_CHILD } component={ TransactionsContainer }/>
		</Route>
	);
}
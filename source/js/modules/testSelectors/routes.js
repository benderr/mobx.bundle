import React from 'react';
import {Route, Link} from 'react-router';
import {TEST_SELECTOR, TEST_SELECTOR_CHILD} from './enums/routes'
import TransactionsContainer from './containers/TransactionsContainer'

export function getRoutes() {
	return (
		<div>
			<Route path={ '/' } component={ TransactionsContainer }/>
			<Route path={ TEST_SELECTOR } component={ TransactionsContainer }/>
			<Route path={ TEST_SELECTOR_CHILD } component={ TransactionsContainer }/>
		</div>
	);
}
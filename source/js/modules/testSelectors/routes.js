import React from 'react';
//import {Route} from 'react-router';
import TransactionsContainer, {TransactionsContainer2} from './containers/TransactionsContainer'

export function getRoutes() {
	return {
		listExampleSecond: {
			path: '/list-example2/second',
			exact: true,
			component: TransactionsContainer2
		},
		listExample: {
			path: '/list-example2/second',
			exact: true,
			component: TransactionsContainer
		}
	}
}
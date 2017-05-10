import TransactionsList from './components/TransactionsList/TransactionsList.jsx';
import React from 'react';

export function getRoutes() {
	return {
		transactionLayer: {
			path: '/finance/:id',
			exact: true,
			component: ({location}) => {
				console.log('finance/id render', location);
				return (<h2> Test transactionLayer</h2>)
			},
			isLayer: true
		},

		/**
		 * Пример правил для слоя
		 */
		routeTest: {
			path: '/route-test',
			exact: true,
			component: () => (<h2>route test</h2>),
			isLayer: true
		},

		/**
		 * Пример правил для слоя
		 */
		routeTest2: {
			path: '/route-test2',
			exact: true,
			component: ({location}) => {
				console.log('route-test2 render');
				return (<h2> Test route-test2</h2>)
			},
			isLayer: true
		}
	}
}
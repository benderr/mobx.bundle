import React from 'react';
//import {Route} from 'react-router';
import TransactionsContainer,{TransactionsContainer2} from './containers/TransactionsContainer'
import InternalLayout from 'components/InternalLayout'

export function getRoutes() {
	return [
		{
			path: '/',
			component: InternalLayout,
			indexRoute: {component: TransactionsContainer}
		},
		{
			path: 'list-example',
			component: InternalLayout,
			indexRoute: {component: TransactionsContainer},
		},
		{
			path: 'list-example2',
			component: InternalLayout,
			indexRoute: {component: TransactionsContainer},
			childRoutes: [
				{
					path: 'second',
					component: TransactionsContainer2
				}]
		}]
}
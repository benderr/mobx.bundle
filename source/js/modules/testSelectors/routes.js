import React from 'react';
//import {Route} from 'react-router';
import TransactionsContainer, {TransactionsContainer2} from './containers/TransactionsContainer'

export function getRoutes() {
	return {
		list: {
			path: '/',
			exact: true,
			component: ()=>{ console.log('render home lsit'); return (<span></span>); }
		},
		listExampleSecond: {
			path: '/list1',
			exact: true,
			isLayer: true,
			component: TransactionsContainer
		},
		listExample: {
			path: '/list2',
			exact: true,
			isLayer: true,
			component: TransactionsContainer2
		}
	}
}
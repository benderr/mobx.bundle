import React from 'react'
import InternalLayout from 'components/InternalLayout'
// import {LayoutRoute} from 'components/RadRouter/customRoutes/LayoutRoute'
import LayerLayout from 'components/LayerLayout'
import TransactionsContainer, {TransactionsContainer2} from 'modules/testSelectors/containers/TransactionsContainer'
import TransactionsList from 'modules/finance/components/TransactionsList/TransactionsList'
import ExternalLayout, {NotFoundLayout} from 'components/ExternalLayout'
import SignInContainer from 'modules/account/containers/SignInContainer'

export const testRoutes = {
	/**
	 * Просто рендеринг роута
	 */
	index: {
		path: '/',
		exact: true,
		component: () => (<h2>Hello World</h2>),
		index: true
	},
	signin: {
		path: '/signin',
		exact: true,
		component: SignInContainer,
		layout: ExternalLayout
	},

	listExampleSecond: {
		path: '/list-example2/second',
		exact: true,
		component: TransactionsContainer2
	},
	/**
	 * Роут в котором можно указать мастер-страницу
	 */
	finance: {
		path: '/finance',
		exact: true,
		component: () => (<h2><TransactionsList></TransactionsList></h2>)
	},
	transactionLayer: {
		path: '/finance/:id',
		exact: true,
		layout: LayerLayout,
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
		component: TransactionsContainer2,
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
	},
	// /**
	//  * Задаем роуты в виде функции
	//  */
	// listExample: {
	// 	render: ({key}) => (
	// 		<LayoutRoute key={key} exact={true} layout={InternalLayout} path="/list-example"
	// 					 component={TransactionsContainer2}/>)
	// }
};
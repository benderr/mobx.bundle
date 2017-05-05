import React from 'react'
import InternalLayout from 'components/InternalLayout'
import {LayoutRoute} from 'components/RadRouter/customRoutes/LayoutRoute'
import LayerLayout from 'components/LayerLayout'
import TransactionsContainer, {TransactionsContainer2} from 'modules/testSelectors/containers/TransactionsContainer'
import TransactionsList from 'modules/finance/components/TransactionsList/TransactionsList'
import ExternalLayout, {NotFoundLayout} from 'components/ExternalLayout'
import FormAuth from 'modules/account/components/signInForm/SignInForm'

export const testRoutes = {
	/**
	 * Просто рендеринг роута
	 */
	index: {
		path: '/',
		exact: true,
		component: () => (<h2>Hello World</h2>),
		layout: InternalLayout,
		index: true
	},
	signin: {
		path: '/signin',
		exact: true,
		component: FormAuth,
		layout: ExternalLayout
	},

	listExampleSecond: {
		path: '/list-example2/second',
		exact: true,
		component: TransactionsContainer2,
		layout: InternalLayout
	},
	/**
	 * Роут в котором можно указать мастер-страницу
	 */
	finance: {
		path: '/finance',
		exact: true,
		component: ()=>(<h2><TransactionsList></TransactionsList></h2>),
		layout: InternalLayout
	},
	transactionLayer: {
		path: '/finance/:id',
		exact: true,
		component: ({location})=>{console.log('finance/id render');return (<h2> Test transactionLayer</h2>)},
		layout: LayerLayout,
		isLayer: true
	},

	/**
	 * Пример правил для слоя
	 */
	routeTest: {
		path: '/route-test',
		exact: true,
		component: ({location})=>{console.log('route-test render');return (<h2> Test route-test</h2>)},
		layout: LayerLayout,
		isLayer: true
	},

	/**
	 * Пример правил для слоя
	 */
	routeTest2: {
		path: '/route-test2',
		exact: true,
		component: ({location})=>{console.log('route-test2 render');return (<h2> Test route-test2</h2>)},
		layout: LayerLayout,
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
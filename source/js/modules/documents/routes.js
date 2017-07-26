import React from 'react';
import {Redirect} from 'react-router-dom';
import ChequeListContainer from './containers/ChequeListContainer'
import MoneyListContainer from './containers/MoneyListContainer'
import IShopListContainer from './containers/IShopListContainer'
import ExternalListContainer from './containers/ExternalListContainer'
import OrderViewContainer from './containers/OrderViewContainer'
import OrderAddContainer from './containers/OrderAddContainer'
import ReportsContainer from './containers/ReportsContainer'
import ChequeFilterContainer from './containers/ChequeFilterContainer'

export function getRoutes() {
	return {
		documentsChequeIndex: {
			path: '/documents',
			exact: true,
			component: () => <Redirect to="/documents/cheque"/>
		},
		documentsCheque: {
			path: '/documents/cheque',
			exact: true,
			component: ChequeListContainer
		},
		documentsChequeFilter: {
			path: '/documents/cheque/filter',
			exact: true,
			layout: ChequeFilterContainer,
			isLayer: true
		},
		documentsMoney: {
			path: '/documents/money',
			exact: true,
			component: MoneyListContainer
		},
		documentsExternal: {
			path: '/documents/external',
			exact: true,
			component: ExternalListContainer
		},
		documentsExternalView: {
			path: '/documents/external/view/:point/:id',
			exact: true,
			layout: OrderViewContainer,
			isLayer: true
		},
		documentsExternalAdd: {
			path: '/documents/external/add',
			exact: true,
			layout: OrderAddContainer,
			isLayer: true
		},
		documentsIShop: {
			path: '/documents/ishop',
			exact: true,
			component: IShopListContainer
		},
		documentsReports: {
			path: '/documents/reports',
			exact: true,
			component: ReportsContainer
		}
	}
}
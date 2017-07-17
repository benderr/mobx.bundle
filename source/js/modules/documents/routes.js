import React from 'react';
import {Redirect} from 'react-router'
import ChequeListContainer from './containers/ChequeListContainer'
import MoneyListContainer from './containers/MoneyListContainer'
import IShopListContainer from './containers/IShopListContainer'
import ExternalListContainer from './containers/ExternalListContainer'
import ReportsContainer from './containers/ReportsContainer'

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